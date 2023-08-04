import { Router } from "express";
import authRoutes from "./auth.routes";

const router = Router();

const api = router.use(authRoutes);

router.use("/api", api);

export default router;
