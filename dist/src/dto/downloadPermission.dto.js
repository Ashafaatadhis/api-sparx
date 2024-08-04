"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseDownloadPermission = void 0;
const responseDownloadPermission = (data) => {
    return {
        id: data.id,
        userId: data.userId,
        songId: data.songId,
        playlistId: data.playlistId,
        format: data.format,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt,
    };
};
exports.responseDownloadPermission = responseDownloadPermission;
