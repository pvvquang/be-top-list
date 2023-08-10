import { PostHeader } from "models";
import { AppError, HttpCode } from "models/http-exception.model";

export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export const handleEmptyKeyObject = (data: object) => {
  let error = false;
  Object.entries(data).forEach(([key, value]) => {
    if (!value) {
      error = true;
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        message: `${capitalizeFirstLetter(key)} is can't blank!`,
      });
    }
  });
  return error;
};

export const checkCategoryExists = async (categoryName: string) => {
  const category = await prisma?.categories.findFirst({
    where: { categoryName },
  });

  if (category) {
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      message: "Category name had existed. Please enter another category name!",
    });
  }
};

export const throwNotFoundError = () => {
  throw new AppError({
    httpCode: HttpCode.NOT_FOUND,
    message: "Not Found!",
  });
};

export function parseHTMLtoJSON(html: string): PostHeader[] {
  const regex =
    /<h([1-6])\s+(?:(?!id="([^"]+)").)*id="([^"]+)">([^<]+)<\/h\1>/g;
  let match;
  const result: PostHeader[] = [];

  while ((match = regex.exec(html)) !== null) {
    const tagName = `H${match[1]}`;
    const level = parseInt(match[1]);
    const link = `#${match[3]}`;
    const label = match[4];

    result.push({ tagName, level, link, label });
  }

  return result;
}
