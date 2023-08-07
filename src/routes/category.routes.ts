import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "controllers/category.controller";
import { Router } from "express";
import { authentication } from "middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/categories/create", authentication, createCategory);
authRouter.get("/categories", authentication, getCategories);
authRouter.get("/categories/:categoryId", authentication, getCategory);
authRouter.put("/categories/:categoryId", authentication, updateCategory);
authRouter.delete("/categories/:categoryId", authentication, deleteCategory);

export default authRouter;
