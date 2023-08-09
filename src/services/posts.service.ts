import { Media } from "@prisma/client";
import prisma from "configs/db";
import { Post, PostInput } from "models";
import { AppError, HttpCode } from "models/http-exception.model";

const postSelectedKey = {
  id: true,
  title: true,
  content: true,
  thumbnail: {
    select: {
      id: true,
      key: true,
      link: true,
      originalName: true,
      type: true,
    },
  },
  category: {
    select: {
      id: true,
      categoryName: true,
    },
  },
  user: {
    select: {
      id: true,
      userName: true,
      email: true,
    },
  },
};

export const createNewPost = async (postInput: PostInput, media: Media) => {
  if (!media.key) {
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      message: "Fail to upload file",
    });
  }
  const newPost = await prisma.posts.create({
    data: {
      ...postInput,
      thumbnail_key: media.link,
      thumbnail: {
        connect: {
          link: media.link,
        },
      } as any,
      category: {
        connect: {
          id: +postInput.categoryId,
        },
      } as any,
      user: {
        connect: {
          id: postInput.userId,
        },
      } as any,
    },
    select: postSelectedKey,
  });

  return newPost;
};

export const getPostById = async (postId: string) => {
  const postItem = await checkValidPostId(postId);
  return postItem;
};

export const getPostBySlug = async (slug: string) => {
  const postItem = await prisma.posts.findUnique({
    where: { slug },
    select: postSelectedKey,
  });
  return postItem;
};

export const getListPost = async () => {
  const listPost = await prisma.posts.findMany({ select: postSelectedKey });
  return listPost;
};

export const updatePostById = async (post: Post, postId: string) => {
  await checkValidPostId(postId);
  const categoryItem = await prisma.categories.update({
    where: { id: +postId },
    data: post,
    select: postSelectedKey,
  });
  return categoryItem;
};

export const deletePostById = async (postId: string) => {
  await checkValidPostId(postId);
  const postItem = await prisma.posts.delete({
    where: { id: +postId },
  });
  return postItem;
};

const checkValidPostId = async (postId: string) => {
  if (isNaN(+postId)) {
    throw new AppError({
      httpCode: HttpCode.NOT_FOUND,
      message: "Post Not Found!",
    });
  }
  const postFound = await prisma.posts.findFirst({
    where: { id: +postId },
    select: postSelectedKey,
  });
  if (!postFound) {
    throw new AppError({
      httpCode: HttpCode.NOT_FOUND,
      message: "Post Not Found!",
    });
  }
  return postFound;
};
