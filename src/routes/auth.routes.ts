import { Router } from "express";
import { authentication } from "../middlewares/auth.middleware";
import * as authController from "../controllers/auth.controller";
import { AppError } from "../models/http-exception.model";

const authRouter = Router();

authRouter.post("/login");
authRouter.get("/logout", (req: any, res: any, next: any) => {
  throw new AppError({ httpCode: 400, message: "had error" });
});
authRouter.get("/self-info", authentication, authController.getSelfInfo);

export default authRouter;
