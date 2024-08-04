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
import { checkAudio, checkImage } from "../middlewares/songMiddleware";
import express from "express";

const router = express.Router();

router.get("/", authentication(), getAllController);
router.get("/:id", authentication(), getDetailController);
router.post(
  "/",
  authentication(),
  postValidationRules(),
  validate,
  postController
);
router.put(
  "/:id",
  authentication(),

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
