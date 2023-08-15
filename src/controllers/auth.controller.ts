import { NextFunction, Request, Response } from "express";
import { LoginInput, RegisterInput, User } from "models/auth.model";
import { HttpCode } from "models/http-exception.model";
import * as authService from "services/auth.service";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: RegisterInput = req.body;
  try {
    const _user = await authService.createUser(user);
    res.status(HttpCode.OK).json(_user);
  } catch (e) {
    next(e);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: LoginInput = req.body;

  try {
    const { token, refreshToken } = await authService.login(user);
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
      })
      .status(HttpCode.OK)
      .json({
        message: "Logged in successfully 😊 👌",
        accessToken: token,
        refreshToken,
      });
  } catch (e) {
    next(e);
  }
};

export const getSelfInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: User = await authService.getSelfInfo(req.user.data);
    const { password, ...rest } = user;
    res.status(HttpCode.OK).json({ ...rest });
  } catch (e) {
    next(e);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params;
  try {
    const newAccessToken = await authService.refreshToken(token);
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
      })
      .status(HttpCode.OK)
      .json({ accessToken: newAccessToken });
  } catch (e) {
    next(e);
  }
};
