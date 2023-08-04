import { Request, Response, NextFunction } from "express";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req;
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req;
};

export const getSelfInfo = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req;
};
