import { Router } from "express";
import authRoutes from "./auth.routes";
import categoryRoutes from "./category.routes";

const router = Router();

const api = router.use(authRoutes).use(categoryRoutes);

router.use("/api", api);

export default router;
