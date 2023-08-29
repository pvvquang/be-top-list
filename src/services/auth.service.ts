import prisma from "configs/db";
import { AppConstant } from "constants/index";
import jwt from "jsonwebtoken";
import { AppError, HttpCode } from "models/http-exception.model";
import { handleEmptyKeyObject } from "utils";
import {
  checkUserExists,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  getAccessTokenActive,
  handleCreateNewAccessToken,
  hashPassword,
  validateEmail,
} from "utils/auth";
import { LoginInput, RegisterInput } from "../models/auth.model";

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

  const newAccessToken = await handleCreateNewAccessToken(_user.id);

  const refreshToken = generateRefreshToken(_user.id);
  const newRefreshToken = await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: _user.id,
      expires: new Date(
        Date.now() + AppConstant.REFRESH_TOKEN_EXPIRES_TIME * 1000
      ),
      replacedByToken: "",
    },
  });

  return { token: newAccessToken.token, refreshToken: newRefreshToken.token };
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

export const refreshToken = async (token: string) => {
  let decoded: any = null;
  try {
    decoded = jwt.verify(token, AppConstant.JWT_REFRESH_KEY as string);
  } catch (err) {
    throw new AppError({
      httpCode: HttpCode.UNAUTHORIZED,
      message: "Refresh key is not valid!",
    });
  }
  await checkUserExistByToken(decoded.data);

  const newAccessToken = await handleCreateNewAccessToken(decoded.data);
  return newAccessToken.token;
};

export const checkUserExistByToken = async (userId: string) => {
  const userInfo = await prisma?.user.findUnique({
    where: { id: userId },
  });
  if (!userInfo) {
    throw new AppError({
      httpCode: HttpCode.UNAUTHORIZED,
      message: "Token is not valid!",
    });
  }
};
