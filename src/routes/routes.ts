import { Router } from "express";
import authRoutes from "./auth.route";
import categoryRoutes from "./category.route";
import mediaRoutes from "./media.route";

const router = Router();

const api = router.use(authRoutes).use(categoryRoutes).use(mediaRoutes);

router.use("/api", api);

export default router;
