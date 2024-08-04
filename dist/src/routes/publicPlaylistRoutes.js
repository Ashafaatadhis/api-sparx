"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const publicPlaylistController_1 = require("../controllers/publicPlaylistController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", publicPlaylistController_1.getAllController);
router.get("/:id", publicPlaylistController_1.getDetailController);
router.get("/:id/songs", publicPlaylistController_1.getAllSongController);
exports.default = router;
