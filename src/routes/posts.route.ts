import {
  createPost,
  deletePost,
  getListPost,
  getPost,
  updatePost,
} from "controllers/posts.controller";
import { Router } from "express";
import { authentication } from "middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/post/create", authentication, createPost);
authRouter.get("/post", authentication, getListPost);
authRouter.get("/post/:postId", authentication, getPost);
authRouter.put("/post/:postId", authentication, updatePost);
authRouter.delete("/post/:postId", authentication, deletePost);

export default authRouter;
