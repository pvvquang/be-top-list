import prisma from "configs/db";
import { MediaInput } from "models";
import { throwNotFoundError } from "utils";

export const createMedia = async (media: MediaInput) => {
  const _media = await prisma.media.create({
    data: media,
  });
  return _media;
};

export const deleteMedia = async (mediaKey: string) => {
  const media = await checkMediaKey(mediaKey);
  if (!media) throwNotFoundError();
  const _media = await prisma.media.delete({ where: { key: mediaKey } });
  return _media;
};

export const checkMediaKey = async (key: string) => {
  return await prisma.media.findFirst({ where: { key } });
};
