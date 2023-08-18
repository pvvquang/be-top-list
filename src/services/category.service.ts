import prisma from "configs/db";
import { PAGINATION } from "constants/app.const";
import { CategoryInput, Pagination } from "models";
import { AppError, HttpCode } from "models/http-exception.model";
import { checkCategoryExists, throwNotFoundError } from "utils";

const categorySelect = {
  id: true,
  categoryName: true,
};

export const createCategory = async (categoryName: string) => {
  await checkCategoryExists(categoryName);
  const category = await prisma.categories.create({
    data: { categoryName },
    select: categorySelect,
  });
  return category;
};

export const getCategory = async (categoryId: string) => {
  const category = await checkValidCategoryId(categoryId);
  return category;
};

export const getCategories = async (pagination: Pagination | undefined) => {
  const categories = await prisma.categories.findMany({
    where: { active: true },
    select: categorySelect,
    orderBy: { updatedAt: "desc" },
  });
  if (!categories) throwNotFoundError();

  const page = pagination?.page || PAGINATION.PAGE;
  const pageSize = pagination?.pageSize || PAGINATION.PAGE_SIZE;
  const result = {
    data: categories.slice((page - 1) * pageSize, page * pageSize),
    metadata: {
      totalItems: categories.length,
      totalPages: Math.ceil(categories.length / pageSize),
    },
  };
  return result;
};

export const updateCategory = async (
  category: CategoryInput,
  categoryId: string
) => {
  await checkValidCategoryId(categoryId);
  const categoryItem = await prisma.categories.update({
    where: { id: +categoryId },
    data: { categoryName: category.categoryName },
    select: categorySelect,
  });
  return categoryItem;
};

export const deleteCategory = async (categoryId: string) => {
  await checkValidCategoryId(categoryId);
  const category = await prisma.categories.update({
    where: { id: +categoryId },
    data: { active: false },
    select: categorySelect,
  });
  return category;
};

const checkValidCategoryId = async (categoryId: string) => {
  if (isNaN(+categoryId)) {
    throw new AppError({ httpCode: HttpCode.NOT_FOUND, message: "Not Found!" });
  }
  const categoryFound = await prisma.categories.findFirst({
    where: { id: +categoryId },
    select: categorySelect,
  });
  if (!categoryFound) {
    throw new AppError({ httpCode: HttpCode.NOT_FOUND, message: "Not Found!" });
  }
  return categoryFound;
};
