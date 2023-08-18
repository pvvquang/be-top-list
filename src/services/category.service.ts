import prisma from "configs/db";
import { CategoryInput } from "models";
import { AppError, HttpCode } from "models/http-exception.model";
import { checkCategoryExists, throwNotFoundError } from "utils";

export const createCategory = async (categoryName: string) => {
  await checkCategoryExists(categoryName);
  const category = await prisma.categories.create({ data: { categoryName } });
  return category;
};

export const getCategory = async (categoryId: string) => {
  const category = await checkValidCategoryId(categoryId);
  return category;
};

export const getCategories = async () => {
  const categories = await prisma.categories.findMany({
    where: { active: true },
  });
  if (!categories) throwNotFoundError();
  return categories;
};

export const updateCategory = async (
  category: CategoryInput,
  categoryId: string
) => {
  await checkValidCategoryId(categoryId);
  const categoryItem = await prisma.categories.update({
    where: { id: +categoryId },
    data: { categoryName: category.categoryName },
  });
  return categoryItem;
};

export const deleteCategory = async (categoryId: string) => {
  await checkValidCategoryId(categoryId);
  const category = await prisma.categories.update({
    where: { id: +categoryId },
    data: { active: false },
  });
  return category;
};

const checkValidCategoryId = async (categoryId: string) => {
  if (isNaN(+categoryId)) {
    throw new AppError({ httpCode: HttpCode.NOT_FOUND, message: "Not Found!" });
  }
  const categoryFound = await prisma.categories.findFirst({
    where: { id: +categoryId },
  });
  if (!categoryFound) {
    throw new AppError({ httpCode: HttpCode.NOT_FOUND, message: "Not Found!" });
  }
  return categoryFound;
};
