import bcrypt from "bcrypt";
import prisma from "configs/db";
import { AppConstant } from "constants/index";
import jwt from "jsonwebtoken";
import { RegisterInput } from "models/auth.model";
import { AppError, HttpCode } from "models/http-exception.model";

const saltRounds = 10;

export const checkUserExists = async (user: RegisterInput) => {
  const { email } = user;
  const _user = await prisma?.user.findUnique({
    where: {
      email,
    },
  });
  if (_user) {
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      message: "Email had existed. Please enter another email!",
    });
  }
};

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const comparePassword = async (pass: string, hash: string) => {
  return await bcrypt.compare(pass, hash);
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
};

export function generateAccessToken(userId: string) {
  return jwt.sign({ data: userId }, AppConstant.JWT_SECRET_KEY as string, {
    expiresIn: AppConstant.ACCESS_TOKEN_EXPIRES_TIME,
  });
}

export function generateRefreshToken(userId: string) {
  return jwt.sign({ data: userId }, AppConstant.JWT_REFRESH_KEY as string, {
    expiresIn: AppConstant.REFRESH_TOKEN_EXPIRES_TIME,
  });
}

export const checkTokenExists = async (userId: string) => {
  const accessToken = await prisma?.accessToken.findFirst({
    where: { userId },
  });
  if (accessToken) {
  } else {
  }
};

export const getAccessTokenActive = async (userId: string) => {
  return await prisma.accessToken.findFirst({
    where: { userId, active: true },
  });
};

export const handleCreateNewAccessToken = async (userId: string) => {
  const newAccessToken = generateAccessToken(userId);
  const oldAccessTokenItem = await getAccessTokenActive(userId);

  const newAccessTokenItem = await prisma.accessToken.create({
    data: {
      token: newAccessToken,
      userId: userId,
      expires: new Date(
        Date.now() + AppConstant.ACCESS_TOKEN_EXPIRES_TIME * 1000
      ),
    },
  });

  if (oldAccessTokenItem && newAccessTokenItem) {
    await prisma.accessToken.update({
      where: { id: oldAccessTokenItem.id },
      data: { active: false },
    });
  }

  return newAccessTokenItem;
};
