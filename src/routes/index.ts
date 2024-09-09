import express from "express";
import authRoutes from "../routes/authRoutes";
import genresRoutes from "../routes/genresRoutes";
import subGenresRoutes from "../routes/subGenresRoutes";
import songRoutes from "../routes/songRoutes";
import playlistRoutes from "../routes/playlistRoutes";
import publicPlaylistRoutes from "../routes/publicPlaylistRoutes";
import downloadPerissionRoutes from "../routes/downloadPermissionRoutes";
import userRoutes from "../routes/userRoutes";
import cloudinary from "../config/cloudinary";
import { authentication } from "@/middlewares/authMiddleware";
import { getDetailController } from "@/controllers/playlistController";
const router = express.Router();

// cloudinary purpose
router.post("/signature", async (req, res) => {
  const { public_id, timestamp } = req.body;

  const signature = cloudinary.utils.api_sign_request(
    { public_id, timestamp },
    process.env.CLOUDINARY_API_SECRET as string
  );

  res.status(200).json({ signature });
});

router.use("/auth", authRoutes);
router.use("/genres", genresRoutes);
router.use("/sub-genres", subGenresRoutes);
router.use("/songs", songRoutes);

router.use("/playlist/:id", authentication(), getDetailController);
router.use("/playlists", playlistRoutes);

router.use("/public/playlists", publicPlaylistRoutes);
router.use("/download-permissions", downloadPerissionRoutes);
router.use("/users", userRoutes);

export default router;
