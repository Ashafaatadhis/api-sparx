"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responsePlaylistSong = exports.responsePlaylist = void 0;
const responsePlaylist = (data) => {
    return {
        id: data.id,
        playListName: data.playlistName,
        createdBy: data.createdBy,
        isPublic: data.isPublic,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt,
    };
};
exports.responsePlaylist = responsePlaylist;
const responsePlaylistSong = (data) => {
    return {
        id: data.id,
        playlistId: data.playlistId,
        songId: data.songId,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt,
    };
};
exports.responsePlaylistSong = responsePlaylistSong;
