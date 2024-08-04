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
exports.getAllSong = exports.getDetail = exports.getAll = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.playlist.findMany({
        include: {
            playlistSong: {
                include: {
                    Song: true,
                },
                where: {
                    Song: {
                        deletedAt: null,
                    },
                    deletedAt: null,
                },
            },
        },
        where: {
            isPublic: true,
        },
    });
    return result;
});
exports.getAll = getAll;
const getDetail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.playlist.findFirst({
        include: {
            playlistSong: {
                include: {
                    Song: true,
                },
                where: {
                    Song: {
                        deletedAt: null,
                    },
                    deletedAt: null,
                },
            },
        },
        where: {
            id: parseInt(id),
            isPublic: true,
        },
    });
    return result;
});
exports.getDetail = getDetail;
const getAllSong = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.playlistSong.findFirst({
        include: {
            Playlist: true,
            Song: true,
        },
        where: {
            playlistId: parseInt(id),
            Playlist: {
                isPublic: true,
            },
        },
    });
    return result;
});
exports.getAllSong = getAllSong;
