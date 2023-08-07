import prisma from "configs/db";
import { CategoryInput } from "models";
import { AppError, HttpCode } from "models/http-exception.model";
import { checkCategoryExists } from "utils";

export const createCategory = async (categoryName: string) => {
  await checkCategoryExists(categoryName);
  const category = await prisma.categories.create({ data: { categoryName } });
  return category;
};

export const getCategory = async (categoryId: string) => {
  checkValidCategoryId(categoryId);
  const category = await prisma.categories.findFirst({
    where: { id: +categoryId },
  });
  if (!category) {
    throw new AppError({ httpCode: HttpCode.NOT_FOUND, message: "Not Found!" });
  }
  return category;
};

export const getCategories = async () => {
  const categories = await prisma.categories.findMany();
  if (!categories) {
    throw new AppError({ httpCode: HttpCode.NOT_FOUND, message: "Not Found!" });
  }
  return categories;
};

export const updateCategory = async (
  category: CategoryInput,
  categoryId: string
) => {
  checkValidCategoryId(categoryId);
  const categoryFound = await prisma.categories.findFirst({
    where: { id: +categoryId },
  });
  if (!categoryFound) {
    throw new AppError({ httpCode: HttpCode.NOT_FOUND, message: "Not Found!" });
  }
  const categoryItem = await prisma.categories.update({
    where: { id: +categoryId },
    data: { categoryName: category.categoryName },
  });
  return categoryItem;
};

export const deleteCategory = async (categoryId: string) => {
  checkValidCategoryId(categoryId);
  const categoryFound = await prisma.categories.findFirst({
    where: { id: +categoryId },
  });
  if (!categoryFound) {
    throw new AppError({ httpCode: HttpCode.NOT_FOUND, message: "Not Found!" });
  }
  const category = await prisma.categories.delete({
    where: { id: +categoryId },
  });
  return category;
};

const checkValidCategoryId = async (categoryId: string) => {
  if (isNaN(+categoryId)) {
    throw new AppError({ httpCode: HttpCode.NOT_FOUND, message: "Not Found!" });
  }
};
