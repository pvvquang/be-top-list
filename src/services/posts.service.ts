import prisma from "configs/db";
import { CategoryInput } from "models";
import { AppError, HttpCode } from "models/http-exception.model";
import { checkCategoryExists, throw404Error } from "utils";

export const createNewPost = async (categoryName: string) => {
  await checkCategoryExists(categoryName);
  const category = await prisma.categories.create({ data: { categoryName } });
  return category;
};

export const getPostById = async (postId: string) => {
  const postItem = await checkValidPostId(postId);
  return postItem;
};

export const getListPost = async () => {
  const listPost = await prisma.posts.findMany();
  if (!listPost) throw404Error();
  return listPost;
};

export const updatePostById = async (post: CategoryInput, postId: string) => {
  await checkValidPostId(postId);
  const categoryItem = await prisma.categories.update({
    where: { id: +postId },
    data: { categoryName: post.categoryName },
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
    throw new AppError({ httpCode: HttpCode.NOT_FOUND, message: "Not Found!" });
  }
  const postFound = await prisma.posts.findFirst({
    where: { id: +postId },
  });
  if (!postFound) {
    throw new AppError({ httpCode: HttpCode.NOT_FOUND, message: "Not Found!" });
  }
  return postFound;
};
