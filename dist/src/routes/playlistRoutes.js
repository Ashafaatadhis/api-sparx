"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const playlistController_1 = require("../controllers/playlistController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const authValidator_1 = require("../validators/authValidator");
const playlistValidator_1 = require("../validators/playlistValidator");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (0, authMiddleware_1.authentication)(), playlistController_1.getAllController);
router.get("/:id", (0, authMiddleware_1.authentication)(), playlistController_1.getDetailController);
router.post("/", (0, authMiddleware_1.authentication)(), (0, playlistValidator_1.postValidationRules)(), authValidator_1.validate, playlistController_1.postController);
router.put("/:id", (0, authMiddleware_1.authentication)(), (0, playlistValidator_1.editValidationRules)(), authValidator_1.validate, playlistController_1.updateController);
router.delete("/:id", (0, authMiddleware_1.authentication)(), playlistController_1.deleteController);
// song to playlist
router.post("/:id/songs", (0, authMiddleware_1.authentication)(), (0, playlistValidator_1.postSongToPlaylistValidationRules)(), authValidator_1.validate, playlistController_1.postPlaylistController);
router.delete("/:id/songs/:songId", (0, authMiddleware_1.authentication)(), playlistController_1.deletPlaylistSongController);
exports.default = router;
