import { NextFunction, Request, Response } from "express";
import { CategoryInput } from "models";
import { HttpCode } from "models/http-exception.model";
import * as categoryService from "services/category.service";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _category: CategoryInput = req.body;
  try {
    const category = await categoryService.createCategory(
      _category.categoryName
    );
    res.status(HttpCode.OK).json(category);
  } catch (e) {
    next(e);
  }
};

export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId } = req.params;
  try {
    const _user = await categoryService.getCategory(categoryId);
    res.status(HttpCode.OK).json(_user);
  } catch (e) {
    next(e);
  }
};

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pagination: any = req.params;
  try {
    const categories = await categoryService.getCategories(pagination);
    res.status(HttpCode.OK).json(categories);
  } catch (e) {
    next(e);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId } = req.params;
  const category = req.body;
  try {
    const categoryUpdated = await categoryService.updateCategory(
      category,
      categoryId
    );
    res
      .status(HttpCode.OK)
      .json({ message: "Category had been updated!", data: categoryUpdated });
  } catch (e) {
    next(e);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId } = req.params;
  try {
    const categoryDeleted = await categoryService.deleteCategory(categoryId);
    res
      .status(HttpCode.OK)
      .json({ message: "Category had been deleted!", data: categoryDeleted });
  } catch (e) {
    next(e);
  }
};
