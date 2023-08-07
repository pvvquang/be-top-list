import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { authentication } from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/auth/register", authController.register);
authRouter.post("/auth/login", authController.login);
authRouter.get("/auth/self-info", authentication, authController.getSelfInfo);

export default authRouter;
