import prisma from "configs/db";
import { NextFunction, Request, Response } from "express";
import { HttpCode } from "models/http-exception.model";
import * as mediaService from "services/media.service";
import { deleteFileS3, getS3LinkUrl } from "services/s3.service";
import { throwNotFoundError } from "utils";

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
    const _listMedia = await Promise.all(
      listMedia.map(async (media) => ({
        ...media,
        link: await getS3LinkUrl(media.key),
      }))
    );
    res.status(HttpCode.OK).json(_listMedia);
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
    if (!media) return throwNotFoundError();
    res
      .status(HttpCode.OK)
      .json({ ...media, link: await getS3LinkUrl(media.key) });
  } catch (e) {
    next(e);
  }
};

export const deleteMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { mediaKey } = req.params;
  try {
    await mediaService.deleteMedia(mediaKey);
    res.status(HttpCode.OK).json({ message: "Media had been deleted!" });
  } catch (e) {
    next(e);
  }
};

export const deleteListMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { keys } = req.body;
  const listMediaKey: Array<{ Key: string }> = JSON.parse(keys);
  try {
    if (!listMediaKey.length) return throwNotFoundError();
    const deleteRes = await deleteFileS3(listMediaKey);
    listMediaKey.forEach(
      async (key) => await mediaService.deleteMedia(key.Key)
    );

    if (!deleteRes) throwNotFoundError();
    res.status(HttpCode.OK).json({ message: "Media had been deleted!" });
  } catch (e) {
    next(e);
  }
};

const checkValidMediaId = (mediaId: string) => {
  if (isNaN(+mediaId)) throwNotFoundError();
};
