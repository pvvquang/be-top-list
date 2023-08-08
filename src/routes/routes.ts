import { Router } from "express";
import authRoutes from "./auth.route";
import categoryRoutes from "./category.route";

const router = Router();

const api = router.use(authRoutes).use(categoryRoutes);

router.use("/api", api);

export default router;
