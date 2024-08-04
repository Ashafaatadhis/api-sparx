"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responsePublicPlaylist = exports.responsePublicPlaylistSong = void 0;
const responsePublicPlaylistSong = (data) => {
    return {
        id: data.Song.id,
        title: data.Song.title,
        singer: data.Song.singer,
        coverSong: data.Song.coverSong,
        genreId: data.Song.genreId,
        subGenreId: data.Song.subGenreId,
        BPM: data.Song.bpm,
        tempo: data.Song.tempo,
        vocal: data.Song.vocal,
        duration: data.Song.duration,
        filePath: data.Song.filePath,
        uploadedBy: data.Song.uploadedBy,
    };
};
exports.responsePublicPlaylistSong = responsePublicPlaylistSong;
const responsePublicPlaylist = (data) => {
    return {
        id: data.id,
        playlistName: data.playlistName,
        createdBy: data.createdBy,
        isPublic: data.isPublic,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt,
        songs: data.playlistSong.map((value) => {
            return {
                id: value.Song.id,
                title: value.Song.title,
                singer: value.Song.singer,
                coverSong: value.Song.coverSong,
                genreId: value.Song.genreId,
                subGenreId: value.Song.subGenreId,
                BPM: value.Song.bpm,
                tempo: value.Song.tempo,
                vocal: value.Song.vocal,
                duration: value.Song.duration,
                filePath: value.Song.filePath,
                uploadedBy: value.Song.uploadedBy,
            };
        }),
    };
};
exports.responsePublicPlaylist = responsePublicPlaylist;
