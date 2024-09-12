import { checkImagePost, checkImageUpdate } from "@/middlewares/songMiddleware";
import {
  deleteController,
  deletePlaylistSongController,
  deleteSharePlaylistController,
  getAllController,
  getAllSongController,
  getDetailController,
  getSharePlaylistController,
  postController,
  postPlaylistController,
  postSharePlaylistController,
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
import rbacMiddleware from "@/middlewares/rbacMiddleware";

const router = express.Router();

router.get("/:genre?/:subgenre?", authentication(), getAllController);
router.post(
  "/",
  authentication(),
  rbacMiddleware(["ADMIN"], "update-genre"),
  checkImagePost("cover"),
  postValidationRules(),
  validate,
  postController
);
router.put(
  "/:id",
  authentication(),
  rbacMiddleware(["ADMIN"], "update-genre"),
  checkImageUpdate("cover"),
  editValidationRules(),
  validate,
  updateController
);
router.delete(
  "/:id",
  authentication(),
  rbacMiddleware(["ADMIN"], "update-genre"),
  deleteController
);

// share playlist
router.post(
  "/:playlistId/generate-link",
  authentication(),
  rbacMiddleware(["ADMIN"], "update-genre"),
  validate,
  postSharePlaylistController
);

router.delete(
  "/generate-link/:uniqueLinkId",
  authentication(),
  rbacMiddleware(["ADMIN"], "update-genre"),

  deleteSharePlaylistController
);

// song to playlist
router.get(
  "/:id/songs/:genre?/:subgenre?",
  authentication(),
  rbacMiddleware(["ADMIN"], "update-genre"),
  getAllSongController
);
router.post(
  "/:id/songs",
  authentication(),
  rbacMiddleware(["ADMIN"], "update-genre"),
  postSongToPlaylistValidationRules(),
  validate,
  postPlaylistController
);
router.delete(
  "/:id/songs/:songId",
  authentication(),
  rbacMiddleware(["ADMIN"], "update-genre"),
  deletePlaylistSongController
);

export default router;
