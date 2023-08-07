import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).json({ message: "Not Authorized!" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401).json({ message: "Token is not valid!" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY || "superSecret");
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid!" });
    return;
  }
};
