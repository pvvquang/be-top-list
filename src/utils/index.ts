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
