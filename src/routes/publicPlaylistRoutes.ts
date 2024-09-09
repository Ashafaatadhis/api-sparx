import {
  getAllController,
  getAllSongController,
  getDetailController,
} from "../controllers/publicPlaylistController";

import express from "express";

const router = express.Router();

router.get("/", getAllController);
router.get("/:link", getDetailController);
router.get("/:link/songs/:genre?/:subgenre?", getAllSongController);

export default router;
