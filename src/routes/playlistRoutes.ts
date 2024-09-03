import { checkImagePost, checkImageUpdate } from "@/middlewares/songMiddleware";
import {
  deleteController,
  deletPlaylistSongController,
  getAllController,
  getDetailController,
  postController,
  postPlaylistController,
  updateController,
} from "../controllers/playlistController";
import { authentication } from "../middlewares/authMiddleware";

import { validate } from "../validators/authValidator";
import {
  postValidationRules,
  editValidationRules,
  postSongToPlaylistValidationRules,
} from "../validators/playlistValidator";

import express from "express";

const router = express.Router();

router.get("/:genre?/:subgenre?", authentication(), getAllController);
router.get("/:id", authentication(), getDetailController);
router.post(
  "/",
  authentication(),
  checkImagePost("cover"),
  postValidationRules(),
  validate,
  postController
);
router.put(
  "/:id",
  authentication(),
  checkImageUpdate("cover"),
  editValidationRules(),
  validate,
  updateController
);
router.delete("/:id", authentication(), deleteController);

// song to playlist
router.post(
  "/:id/songs",
  authentication(),
  postSongToPlaylistValidationRules(),
  validate,
  postPlaylistController
);
router.delete(
  "/:id/songs/:songId",
  authentication(),
  deletPlaylistSongController
);

export default router;
