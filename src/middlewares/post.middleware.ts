import { NextFunction, Request, Response } from "express";
import { AppError, HttpCode } from "models/http-exception.model";
import { getPostBySlug } from "services/posts.service";

export const checkValidPostPayload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, slug, content, userId, categoryId } = req.body;
  if (!title) {
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      message: "Title can not be blank",
    });
  }
  if (!slug) {
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      message: "Slug can not be blank",
    });
  }
  if (!content) {
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      message: "Body can not be blank",
    });
  }
  if (!req.file) {
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      message: "Thumbnail can not be blank",
    });
  }
  if (!categoryId) {
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      message: "Category can not be blank",
    });
  }
  if (!userId) {
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      message: "User can not be blank",
    });
  }

  next();
};

export const checkValidPostSlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { slug } = req.body;
  const postFound = await getPostBySlug(slug);
  if (!!postFound) {
    res.status(HttpCode.BAD_REQUEST).json({ message: "Slug already exists!" });
  }
  next();
};
