import { NextFunction, Request, Response } from "express";
import { CategoryInput } from "models";
import { HttpCode } from "models/http-exception.model";
import * as postService from "services/posts.service";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _category: CategoryInput = req.body;
  try {
    const category = await postService.createNewPost(_category.categoryName);
    res.status(HttpCode.OK).json(category);
  } catch (e) {
    next(e);
  }
};

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postId } = req.params;
  try {
    const post = await postService.deletePostById(postId);
    res.status(HttpCode.OK).json(post);
  } catch (e) {
    next(e);
  }
};

export const getListPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const listPost = await postService.getListPost();
    res.status(HttpCode.OK).json(listPost);
  } catch (e) {
    next(e);
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postId } = req.params;
  const post = req.body;
  try {
    const postUpdated = await postService.updatePostById(post, postId);
    res
      .status(HttpCode.OK)
      .json({ message: "Post had been updated!", data: postUpdated });
  } catch (e) {
    next(e);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postId } = req.params;
  try {
    const postDeleted = await postService.deletePostById(postId);
    res
      .status(HttpCode.OK)
      .json({ message: "The post had been deleted!", data: postDeleted });
  } catch (e) {
    next(e);
  }
};
