import express from "express";
import authRoutes from "../routes/authRoutes";
import genresRoutes from "../routes/genresRoutes";
import subGenresRoutes from "../routes/subGenresRoutes";
import songRoutes from "../routes/songRoutes";
import playlistRoutes from "../routes/playlistRoutes";
import publicPlaylistRoutes from "../routes/publicPlaylistRoutes";
import downloadPerissionRoutes from "../routes/downloadPermissionRoutes";
import userRoutes from "../routes/userRoutes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/genres", genresRoutes);
router.use("/sub-genres", subGenresRoutes);
router.use("/songs", songRoutes);
router.use("/playlists", playlistRoutes);
router.use("/public/playlists", publicPlaylistRoutes);
router.use("/download-permissions", downloadPerissionRoutes);
router.use("/users", userRoutes);

export default router;
