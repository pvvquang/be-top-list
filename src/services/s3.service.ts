import {
  S3Client,
  PutObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";
import { config } from "../configs/upload";
import { AppError, HttpCode } from "models/http-exception.model";

export const s3 = new S3Client({
  credentials: {
    accessKeyId: config.aws_access_key_id,
    secretAccessKey: config.aws_secret_access_key,
  },
  region: config.region,
});

export const uploadToS3 = async (fileData?: Express.Multer.File) => {
  try {
    const fileContent = fs.readFileSync(fileData!.path);
    const mediaKey = fileData!.filename + "-" + Date.now();
    const params = {
      Bucket: config.bucket_name,
      Key: mediaKey,
      Body: fileContent,
      ContentType: fileData!.mimetype,
    };
    const command = new PutObjectCommand(params);
    try {
      await s3.send(command);
      const url = await getS3LinkUrl(mediaKey);

      let result = {
        success: true,
        data: {
          key: mediaKey,
          type: fileData!.mimetype,
          originalName: fileData!.originalname,
          link: url,
        },
      };
      return result;
    } catch (error) {
      throw new AppError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        message: "Internal Server Error, Failed to upload S3",
      });
    }
  } catch (error) {
    throw new AppError({
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
      message: "Unable to Upload the file",
    });
  }
};

export const deleteFileS3 = async (keys: { Key: string }[]) => {
  var params = {
    Bucket: config.bucket_name,
    Delete: {
      Objects: keys,
      Quiet: false,
    },
  };

  const command = new DeleteObjectsCommand(params);
  const data = await s3.send(command);
  return data;
};

export const getS3LinkUrl = async (key: string) => {
  const getOjectCommand = new GetObjectCommand({
    Bucket: config.bucket_name,
    Key: key,
  });
  const url = await getSignedUrl(s3, getOjectCommand, {
    expiresIn: 604800,
  });
  return url;
};
