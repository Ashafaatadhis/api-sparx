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
exports.deletPlaylistSongController = exports.postPlaylistController = exports.deleteController = exports.updateController = exports.postController = exports.getDetailController = exports.getAllController = void 0;
const playlistServices_1 = require("../services/playlistServices");
const playlist_dto_1 = require("../dto/playlist.dto");
const logger_1 = __importDefault(require("../utils/logger"));
const playlistPolicy_1 = __importDefault(require("../policy/playlistPolicy"));
const getAllController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(req === null || req === void 0 ? void 0 : req.user)) {
            logger_1.default.error("Get All Error: User not Found");
            return res
                .status(500)
                .json({ status: 500, message: "Failed to retrieve playlists" });
        }
        const result = yield (0, playlistServices_1.getAllByUserId)(req.user.sub);
        logger_1.default.info("Get All Success: Successfully retrieved playlists");
        return res.status(200).json({
            status: 200,
            message: "Successfully retrieved playlists",
            data: result.map((value) => {
                return (0, playlist_dto_1.responsePlaylist)(value);
            }),
        });
    }
    catch (err) {
        logger_1.default.error("Get All Error: Failed to retrieve playlists");
        return res
            .status(500)
            .json({ status: 500, message: "Failed to retrieve playlists" });
    }
});
exports.getAllController = getAllController;
const getDetailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!(req === null || req === void 0 ? void 0 : req.user)) {
            logger_1.default.error("Get Error: User not Found");
            return res
                .status(500)
                .json({ status: 500, message: "Failed to retrieve playlist" });
        }
        const result = yield (0, playlistServices_1.getDetailByUserId)(id, req.user.sub);
        logger_1.default.info("Get Success: Successfully retrieved playlist");
        return res.status(200).json({
            status: 200,
            message: "Succesfully retrieved playlist",
            data: result ? (0, playlist_dto_1.responsePlaylist)(result) : null,
        });
    }
    catch (err) {
        logger_1.default.error("Get Error: Failed to retrieve playlist");
        return res
            .status(500)
            .json({ status: 500, message: "Failed to retrieve playlist" });
    }
});
exports.getDetailController = getDetailController;
const postController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(req === null || req === void 0 ? void 0 : req.user)) {
            logger_1.default.error("Add Error: User not Found");
            return res
                .status(500)
                .json({ status: 500, message: "Failed to retrieve playlist" });
        }
        req.body.createdBy = req.user.sub;
        const result = yield (0, playlistServices_1.insertData)(req.body);
        logger_1.default.info("Add Success: Successfully created playlist");
        return res.status(201).json({
            status: 201,
            message: "Successfully created playlist",
            data: (0, playlist_dto_1.responsePlaylist)(result),
        });
    }
    catch (err) {
        console.log(err);
        logger_1.default.error("Add Error: Failed to create playlist");
        return res
            .status(500)
            .json({ status: 500, message: "Failed to create playlist" });
    }
});
exports.postController = postController;
const updateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!(req === null || req === void 0 ? void 0 : req.user)) {
            logger_1.default.error("Edit Error: User not Found");
            return res
                .status(500)
                .json({ status: 500, message: "Failed to update playlist" });
        }
        const getPlaylist = yield (0, playlistServices_1.getDetailByUserId)(id, req.user.sub);
        if (!getPlaylist) {
            logger_1.default.error("Edit Error: Playlist not found");
            return res
                .status(500)
                .json({ status: 500, message: "Failed to update playlist" });
        }
        // jika update punya orang lain
        if (!(0, playlistPolicy_1.default)(req.user, getPlaylist)) {
            logger_1.default.error("Edit Error: Forbidden");
            return res
                .status(401)
                .json({ status: 401, message: "Forbidden to update" });
        }
        const result = yield (0, playlistServices_1.editData)(req.body, id);
        logger_1.default.error("Edit Success: Successfully updated playlist");
        return res.status(200).json({
            status: 200,
            message: "Successfully Edit This Song",
            data: (0, playlist_dto_1.responsePlaylist)(result),
        });
    }
    catch (err) {
        console.log(err);
        logger_1.default.error("Edit Error: Failed to update playlist");
        return res
            .status(500)
            .json({ status: 500, message: "Failed to update playlist" });
    }
});
exports.updateController = updateController;
const deleteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!(req === null || req === void 0 ? void 0 : req.user)) {
            logger_1.default.error("Delete Error: User not Found");
            return res
                .status(500)
                .json({ status: 500, message: "Failed to delete playlist" });
        }
        const getPlaylist = yield (0, playlistServices_1.getDetailByUserId)(id, req.user.sub);
        if (!getPlaylist) {
            logger_1.default.error("Delete Error: Playlist not found");
            return res
                .status(500)
                .json({ status: 500, message: "Failed to delete playlist" });
        }
        // jika delete punya orang lain
        if (!(0, playlistPolicy_1.default)(req.user, getPlaylist)) {
            logger_1.default.error("Delete Error: Forbidden");
            return res
                .status(401)
                .json({ status: 401, message: "Forbidden to delete" });
        }
        if (!(yield (0, playlistServices_1.deleteData)(id))) {
            logger_1.default.error("Delete Error: Failed to delete playlist");
            return res
                .status(500)
                .json({ status: 500, message: "Failed to delete playlist" });
        }
        logger_1.default.info("Delete Success: Successfully deleted playlist");
        return res.status(200).json({
            status: 200,
            message: "Successfully deleted playlist",
        });
    }
    catch (err) {
        logger_1.default.error("Delete Error: Failed to delete playlist");
        return res
            .status(500)
            .json({ status: 500, message: "Failed to delete playlist" });
    }
});
exports.deleteController = deleteController;
// ADD SONG TO PLAYLIST
const postPlaylistController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!(req === null || req === void 0 ? void 0 : req.user)) {
            logger_1.default.error("Add Error: User not Found");
            return res
                .status(500)
                .json({ status: 500, message: "Failed to add song to playlist" });
        }
        const playlist = yield (0, playlistServices_1.getDetailByUserId)(id, req.user.sub);
        if (!playlist) {
            logger_1.default.error("Delete Error: Failed to add song to playlist");
            return res
                .status(500)
                .json({ status: 500, message: "Failed to add song to playlist" });
        }
        req.body.playlistId = playlist.id;
        const result = yield (0, playlistServices_1.insertDataSongToPlaylist)(req.body);
        logger_1.default.info("Add Success: Successfully added song to playlist");
        return res.status(200).json({
            status: 200,
            message: "Successfully added song to playlist",
            data: (0, playlist_dto_1.responsePlaylistSong)(result),
        });
    }
    catch (err) {
        console.log(err);
        logger_1.default.error("Delete Error: Failed to add song to playlist");
        return res
            .status(500)
            .json({ status: 500, message: "Failed to add song to playlist" });
    }
});
exports.postPlaylistController = postPlaylistController;
const deletPlaylistSongController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, songId } = req.params;
        if (!(req === null || req === void 0 ? void 0 : req.user)) {
            logger_1.default.error("Add Error: User not Found");
            return res
                .status(500)
                .json({ status: 500, message: "Failed to remove song from playlist" });
        }
        const getPlaylist = yield (0, playlistServices_1.getDetailByUserId)(id, req.user.sub);
        if (!getPlaylist) {
            logger_1.default.error("Delete Error: Playlist not found");
            return res
                .status(500)
                .json({ status: 500, message: "Failed to remove song from playlist" });
        }
        const getSongInPlaylist = yield (0, playlistServices_1.getDataSongInPlaylist)(getPlaylist.id, parseInt(songId));
        if (!getSongInPlaylist) {
            logger_1.default.error("Delete Error: Song in playlist not found");
            return res
                .status(500)
                .json({ status: 500, message: "Failed to remove song from playlist" });
        }
        // jika delete punya orang lain
        if (!(0, playlistPolicy_1.default)(req.user, getPlaylist)) {
            logger_1.default.error("Delete Error: Forbidden");
            return res
                .status(401)
                .json({ status: 401, message: "Forbidden to delete" });
        }
        if (!(yield (0, playlistServices_1.deleteSongInPlaylist)(getPlaylist.id, parseInt(songId)))) {
            logger_1.default.error("Delete Error: Failed to remove song from playlist");
            return res
                .status(500)
                .json({ status: 500, message: "Failed to remove song from playlist" });
        }
        logger_1.default.info("Delete Success: Successfully removed song from playlist");
        return res.status(200).json({
            status: 200,
            message: "Successfully removed song from playlist",
        });
    }
    catch (err) {
        logger_1.default.error("Delete Error: Failed to remove song from playlist");
        return res
            .status(500)
            .json({ status: 500, message: "Failed to remove song from playlist" });
    }
});
exports.deletPlaylistSongController = deletPlaylistSongController;
