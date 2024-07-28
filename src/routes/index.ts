import express from "express";
import authRoutes from "@/routes/authRoutes";
import genresRoutes from "@/routes/genresRoutes";
import subGenresRoutes from "@/routes/subGenresRoutes";
import songRoutes from "@/routes/songRoutes";
import playlistRoutes from "@/routes/playlistRoutes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/genres", genresRoutes);
router.use("/sub-genres", subGenresRoutes);
router.use("/songs", songRoutes);
router.use("/playlists", playlistRoutes);

export default router;
