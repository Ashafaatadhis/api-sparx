"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSongController = exports.getDetailController = exports.getAllController = void 0;
const publicPlaylistService_1 = require("../services/publicPlaylistService");
const publicPlaylist_dto_1 = require("../dto/publicPlaylist.dto");
const logger_1 = __importDefault(require("../utils/logger"));
const getAllController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, publicPlaylistService_1.getAll)();
        logger_1.default.info("Get All Success: Successfully retrieved public playlists");
        return res.status(200).json({
            status: 200,
            message: "Successfully retrieved public playlists",
            data: result.map((value) => {
                return (0, publicPlaylist_dto_1.responsePublicPlaylist)(value);
            }),
        });
    }
    catch (err) {
        logger_1.default.error("Get All Error: Failed to retrieve public playlists");
        return res
            .status(500)
            .json({ status: 500, message: "Failed to retrieve public playlists" });
    }
});
exports.getAllController = getAllController;
const getDetailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, publicPlaylistService_1.getDetail)(id);
        logger_1.default.info("Get Success: Successfully retrieved public playlist");
        return res.status(200).json({
            status: 200,
            message: "Successfully retrieved public playlist",
            data: result ? (0, publicPlaylist_dto_1.responsePublicPlaylist)(result) : null,
        });
    }
    catch (err) {
        logger_1.default.info("Get Error: Failed to retrieve public playlist");
        return res
            .status(500)
            .json({ status: 500, message: "Failed to retrieve public playlist" });
    }
});
exports.getDetailController = getDetailController;
const getAllSongController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, publicPlaylistService_1.getAllSong)(id);
        logger_1.default.info("Get Success: Successfully retrieved songs in the playlist");
        return res.status(200).json({
            status: 200,
            message: "Successfully retrieved songs in the playlist",
            data: result ? (0, publicPlaylist_dto_1.responsePublicPlaylistSong)(result) : null,
        });
    }
    catch (err) {
        logger_1.default.info("Get Error: Failed to retrieve songs in the playlist");
        return res.status(500).json({
            status: 500,
            message: "Failed to retrieve songs in the playlist",
        });
    }
});
exports.getAllSongController = getAllSongController;
