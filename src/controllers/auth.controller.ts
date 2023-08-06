import { NextFunction, Request, Response } from "express";
import { LoginInput, RegisterInput } from "models/auth.model";
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
    const accessToken = await authService.login(user);
    res
      .cookie("accessToken", accessToken.token, {
        httpOnly: true,
        secure: true,
      })
      .status(HttpCode.OK)
      .json({ message: "Logged in successfully 😊 👌" });
  } catch (e) {
    next(e);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;
};

export const getSelfInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;
};
