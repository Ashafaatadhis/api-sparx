import {
  getAllController,
  getAllSongController,
  getDetailController,
} from "@/controllers/publicPlaylistController";

import express from "express";

const router = express.Router();

router.get("/", getAllController);
router.get("/:id", getDetailController);
router.get("/:id/songs", getAllSongController);

export default router;
