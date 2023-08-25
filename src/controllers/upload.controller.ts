import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { Media, MediaInput } from "models";
import { HttpCode } from "models/http-exception.model";
import multer from "multer";
import { createMedia, deleteMedia } from "services/media.service";
import { deleteFileS3, uploadToS3 } from "services/s3.service";
import { promisify } from "util";

const upload = multer({ dest: "uploads/" });
export const unlinkAsync = promisify(fs.unlink);
export const uploadSingle = upload.single("file");

export class UploadFileDownLoad {
  static upload = async (req: Request, res: any) => {
    // try {
    //   if (!req.file) {
    //     res.status(400).send("file can not be blank");
    //   } else {
    //     const uploadRes = await uploadDataDownload(req.file);
    //     await unlinkAsync(req.file!.path);
    //     await res.status(200).send(uploadRes.data);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };
}

export class uploadFile {
  static upload = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      req.upload = "";
      next();
    } else {
      const uploadRes = await uploadToS3(req.file);
      if (!uploadRes.success) {
        await unlinkAsync(req.file!.path);
        res
          .status(HttpCode.INTERNAL_SERVER_ERROR)
          .json({ message: "Error while uploading file" });
        req.upload = "";
      } else {
        await unlinkAsync(req.file!.path);
        await createMedia(uploadRes.data as MediaInput);
        req.upload = uploadRes.data;
        next();
      }
    }
  };

  static delete = async (req: Request, res: any, next: NextFunction) => {
    const media: Media = req.body;
    const deleteRes = await deleteFileS3([{ Key: media.key }]);
    await deleteMedia(media.key);

    if (!deleteRes) {
      res
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Error while deleting file" });
    } else {
      next();
    }
  };
}
