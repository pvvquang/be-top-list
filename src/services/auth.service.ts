import { handleEmptyKeyObject } from "utils";
import {
  checkUserExists,
  comparePassword,
  generateAccessToken,
  hashPassword,
  validateEmail,
} from "utils/auth";
import { LoginInput, RegisterInput } from "../models/auth.model";
import prisma from "configs/db";
import { AppError, HttpCode } from "models/http-exception.model";
import { AppConstant } from "constants/index";

export const createUser = async (user: RegisterInput) => {
  handleEmptyKeyObject(user);
  await checkUserExists(user);
  const newPassword = hashPassword(user.password);
  const _user = await prisma.user.create({
    data: {
      email: user.email,
      userName: user.userName,
      password: newPassword,
    },
  });
  return _user;
};

export const login = async (user: LoginInput) => {
  handleEmptyKeyObject(user);

  if (!validateEmail(user.email)) {
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      message: "Email is not valid!",
    });
  }

  const _user = await prisma.user.findUnique({ where: { email: user.email } });
  if (!_user) {
    throw new AppError({
      httpCode: HttpCode.NOT_FOUND,
      message: "Email is wrong. Please try again!",
    });
  }

  if (!comparePassword(user.password, _user.password)) {
    throw new AppError({
      httpCode: HttpCode.NOT_FOUND,
      message: "Password is wrong. Please check again!",
    });
  }

  const oldAccessToken = await prisma.accessToken.findFirst({
    where: {
      userId: _user.id,
      active: true,
    },
  });
  const newToken = generateAccessToken(_user.id);
  const newAccessToken = await prisma.accessToken.create({
    data: {
      token: newToken,
      userId: _user.id,
      expires: new Date(Date.now() + AppConstant.EXPIRES_TIME * 1000),
    },
  });
  if (oldAccessToken && newAccessToken) {
    await prisma.accessToken.update({
      where: { id: oldAccessToken.id },
      data: { active: false },
    });
  }
  return newAccessToken;
};

export const getSelfInfo = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new AppError({
      httpCode: HttpCode.NOT_FOUND,
      message: "Some thing wrong!. User not found",
    });
  }
  return user;
};
