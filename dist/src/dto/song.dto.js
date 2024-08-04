"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseSong = void 0;
const responseSong = (data) => {
    return {
        id: data.id,
        title: data.title,
        singer: data.singer,
        coverSong: data.coverSong,
        genreId: data.genreId,
        subGenreId: data.subGenreId,
        BPM: data.bpm,
        tempo: data.tempo,
        vocal: data.vocal,
        duration: data.duration,
        filePath: data.filePath,
        uploadedBy: data.uploadedBy,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt,
    };
};
exports.responseSong = responseSong;
