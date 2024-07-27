import express from "express";
import authRoutes from "@/routes/authRoutes";
import genresRoutes from "@/routes/genresRoutes";
import subGenresRoutes from "@/routes/subGenresRoutes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/genres", genresRoutes);
router.use("/sub-genres", subGenresRoutes);

export default router;
