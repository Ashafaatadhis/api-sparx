import express from "express";
import authRoutes from "@/routes/authRoutes";
import genresRoutes from "@/routes/genresRoutes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/genres", genresRoutes);

export default router;
