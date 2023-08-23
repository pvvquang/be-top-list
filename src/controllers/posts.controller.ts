import { NextFunction, Request, Response } from "express";
import { HttpCode } from "models/http-exception.model";
import * as mediaService from "services/media.service";
import * as postService from "services/posts.service";
import { parseHTMLtoJSON, throwNotFoundError } from "utils";
import { passImageUrlToHTMLTemplate } from "utils/handlebars";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newPost = await postService.createNewPost(req.body, req.upload);
    const postResponse = {
      ...newPost,
      headers: parseHTMLtoJSON(newPost.content),
      content: await passImageUrlToHTMLTemplate(
        newPost.content,
        newPost.imageKeys
      ),
    };
    res.status(HttpCode.OK).json(postResponse);
  } catch (e) {
    mediaService.deleteMedia(req.upload.key);
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
    const post = await postService.getPostById(postId);
    const postResponse = {
      ...post,
      headers: parseHTMLtoJSON(post.content),
      content: await passImageUrlToHTMLTemplate(post.content, post.imageKeys),
    };
    res.status(HttpCode.OK).json(postResponse);
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
    const postResponse = {
      ...post,
      headers: parseHTMLtoJSON(post.content),
      content: await passImageUrlToHTMLTemplate(post.content, post.imageKeys),
    };
    res.status(HttpCode.OK).json(postResponse);
  } catch (e) {
    next(e);
  }
};

export const getListPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pagination: any = req.query;
  try {
    const listPost = await postService.getListPost(pagination);
    listPost.data = await Promise.all(
      listPost.data.map(async (post) => ({
        ...post,
        headers: parseHTMLtoJSON(post.content),
        content: await passImageUrlToHTMLTemplate(post.content, post.imageKeys),
      }))
    );
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
