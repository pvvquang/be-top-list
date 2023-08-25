import { Router } from "express";
import authRoutes from "./auth.route";
import categoryRoutes from "./category.route";
import mediaRoutes from "./media.route";
import postRoutes from "./posts.route";

const router = Router();

const api = router
  .use(authRoutes)
  .use(categoryRoutes)
  .use(mediaRoutes)
  .use(postRoutes);

router.use("/api", api);

export default router;
