import { NextFunction, Request, Response } from "express";
import { AppError, HttpCode } from "models/http-exception.model";
import prisma from "configs/db";
import { throw404Error } from "utils";
import { uploadFile } from "./upload.controller";

export const createMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const media = req.upload;
    res.status(HttpCode.OK).json(media);
  } catch (e) {
    next(e);
  }
};

export const getListMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const listMedia = await prisma.media.findMany();
    res.status(HttpCode.OK).json(listMedia);
  } catch (e) {
    next(e);
  }
};

export const getMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { mediaId } = req.params;
  checkValidMediaId(mediaId);
  try {
    const media = await prisma.media.findUnique({ where: { id: +mediaId } });
    if (!media) throw404Error();
    res.status(HttpCode.OK).json(media);
  } catch (e) {
    next(e);
  }
};

export const deleteMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    
    // delete db + s3
    res.status(HttpCode.OK).json({ message: "Media had been deleted!" });
  } catch (e) {
    next(e);
  }
};

const checkValidMediaId = (mediaId: string) => {
  if (isNaN(+mediaId)) {
    throw new AppError({ httpCode: HttpCode.NOT_FOUND, message: "Not Found!" });
  }
};
