import { NextFunction, Request, Response } from "express";
import { CategoryInput, PostInput } from "models";
import { HttpCode } from "models/http-exception.model";
import * as postService from "services/posts.service";
import { parseHTMLtoJSON, throwNotFoundError } from "utils";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newPost = await postService.createNewPost(req.body, req.upload);
    res
      .status(HttpCode.OK)
      .json({ ...newPost, headers: parseHTMLtoJSON(newPost.content) });
  } catch (e) {
    next(e);
  }
};

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postId } = req.params;
  try {
    const post = await postService.deletePostById(postId);
    res
      .status(HttpCode.OK)
      .json({ ...post, headers: parseHTMLtoJSON(post.content) });
  } catch (e) {
    next(e);
  }
};

export const getPostBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { slug } = req.params;
  try {
    const post = await postService.getPostBySlug(slug);
    if (!post) return throwNotFoundError();
    res
      .status(HttpCode.OK)
      .json({ ...post, headers: parseHTMLtoJSON(post.content) });
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
