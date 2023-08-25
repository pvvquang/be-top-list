import prisma from "configs/db";
import { MediaInput } from "models";
import { throwNotFoundError } from "utils";
import { deleteFileS3 } from "./s3.service";

export const createMedia = async (media: MediaInput) => {
  const _media = await prisma.media.create({
    data: media,
  });
  return _media;
};

export const deleteMedia = async (mediaKey: string) => {
  const media = await checkMediaKey(mediaKey);
  if (!media) throwNotFoundError();
  // delete file on S3
  const deleteRes = await deleteFileS3([{ Key: mediaKey }]);
  if (!deleteRes) throwNotFoundError();
  // delete file in database
  const _media = await prisma.media.delete({ where: { key: mediaKey } });
  return _media;
};

export const checkMediaKey = async (key: string) => {
  return await prisma.media.findFirst({ where: { key } });
};
