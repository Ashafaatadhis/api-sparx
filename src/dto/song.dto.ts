import { Prisma, Song } from "@prisma/client";

type SongWithGenreAndSubGenre = Prisma.SongGetPayload<{
  include: {
    Genre: {
      select: {
        id: true;
        genreName: true;
      };
    };
    SubGenre: {
      select: {
        id: true;
        subGenreName: true;
      };
    };
  };
}>;

export const responseSong = (data: SongWithGenreAndSubGenre) => {
  return {
    id: data.id,
    title: data.title,
    singer: data.singer,
    coverSong: data.coverSong,
    genre: {
      id: data.Genre.id,
      name: data.Genre.genreName,
    },
    subGenre: {
      id: data.SubGenre?.id,
      name: data.SubGenre?.subGenreName,
    },

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
