import { Router } from "express";
import * as mediaController from "../controllers/media.controller";
import { authentication } from "../middlewares/auth.middleware";
import { uploadFile, uploadSingle } from "controllers/upload.controller";

const authRouter = Router();

authRouter.post(
  "/media/create",
  authentication,
  uploadSingle,
  uploadFile.upload,
  mediaController.createMedia
);
authRouter.get("/media/:mediaId", authentication, mediaController.getMedia);
authRouter.get("/media", authentication, mediaController.getListMedia);
authRouter.delete("/media", authentication, mediaController.deleteMedia);

export default authRouter;
