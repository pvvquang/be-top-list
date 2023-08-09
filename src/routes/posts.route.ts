import * as postController from "controllers/posts.controller";
import { uploadFile, uploadSingle } from "controllers/upload.controller";
import { Router } from "express";
import { authentication } from "middlewares/auth.middleware";
import { checkValidPostPayload } from "middlewares/post.middleware";
const multer = require("multer");
const upload = multer();

const authRouter = Router();

authRouter.post(
  "/posts/create",
  authentication,
  uploadSingle,
  checkValidPostPayload,
  uploadFile.upload,
  postController.createPost
);
authRouter.get("/posts", authentication, postController.getListPost);
authRouter.get("/posts/:postId", authentication, postController.getPostById);
authRouter.get(
  "/posts/slug/:slug",
  authentication,
  postController.getPostBySlug
);
authRouter.put(
  "/posts/:postId",
  authentication,
  checkValidPostPayload,
  postController.updatePost
);
authRouter.delete("/posts/:postId", authentication, postController.deletePost);

export default authRouter;
