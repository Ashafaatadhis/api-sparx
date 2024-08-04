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
exports.deleteSongInPlaylist = exports.getDataSongInPlaylist = exports.insertDataSongToPlaylist = exports.deleteData = exports.editData = exports.insertData = exports.getDetailByUserId = exports.getAllByUserId = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getAllByUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.playlist.findMany({
        where: {
            createdBy: id,
        },
    });
    return result;
});
exports.getAllByUserId = getAllByUserId;
const getDetailByUserId = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.playlist.findFirst({
        where: {
            id: parseInt(id),
            createdBy: userId,
        },
    });
    return result;
});
exports.getDetailByUserId = getDetailByUserId;
const insertData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.playlist.create({
        data,
    });
    return result;
});
exports.insertData = insertData;
const editData = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.playlist.update({
        data,
        where: {
            id: parseInt(id),
        },
    });
    return result;
});
exports.editData = editData;
const deleteData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const find = yield prisma_1.default.playlist.findFirst({
        where: {
            id: parseInt(id),
        },
    });
    if (!find)
        return false;
    const result = yield prisma_1.default.playlist.delete({
        where: {
            id: parseInt(id),
        },
    });
    return result;
});
exports.deleteData = deleteData;
const insertDataSongToPlaylist = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.playlistSong.create({
        data,
    });
    return result;
});
exports.insertDataSongToPlaylist = insertDataSongToPlaylist;
const getDataSongInPlaylist = (playlistId, songId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.playlistSong.findFirst({
        where: {
            playlistId,
            songId,
        },
    });
    return result;
});
exports.getDataSongInPlaylist = getDataSongInPlaylist;
const deleteSongInPlaylist = (playlistId, songId) => __awaiter(void 0, void 0, void 0, function* () {
    const find = yield prisma_1.default.playlistSong.findFirst({
        where: {
            playlistId,
            songId,
        },
    });
    if (!find)
        return false;
    const result = yield prisma_1.default.playlistSong.deleteMany({
        where: {
            playlistId,
            songId,
        },
    });
    return result;
});
exports.deleteSongInPlaylist = deleteSongInPlaylist;
