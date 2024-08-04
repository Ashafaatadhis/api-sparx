import { Song } from "@prisma/client";

export const responseSong = (data: Song) => {
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
