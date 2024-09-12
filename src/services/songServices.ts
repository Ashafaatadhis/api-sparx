import prisma from "../config/prisma";
import { Song } from "@prisma/client";

export const getAll = async (
  skip: number,
  take: number,
  genre: number,
  subgenre: number
) => {
  const result = await prisma.song.findMany({
    skip,
    take,
    where: {
      ...(genre > 0 ? { genreId: genre } : {}),
      ...(subgenre > 0 ? { genreId: genre, subGenreId: subgenre } : {}),
    },
    include: {
      playlistSong: {
        where: {
          deletedAt: null,
        },
      },

      Genre: {
        select: {
          id: true,
          genreName: true,
        },
      },
      SubGenre: {
        select: {
          id: true,
          subGenreName: true,
        },
      },
    },
  });
  const count = await prisma.song.count({
    where: {
      ...(genre > 0 ? { genreId: genre } : {}),
      ...(subgenre > 0 ? { genreId: genre, subGenreId: subgenre } : {}),
    },
  });
  console.log(count);
  return { result, count };
};
export const getDetail = async (id: string) => {
  const result = await prisma.song.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      playlistSong: {
        where: {
          deletedAt: null,
        },
      },
      Genre: {
        select: {
          id: true,
          genreName: true,
        },
      },
      SubGenre: {
        select: {
          id: true,
          subGenreName: true,
        },
      },
    },
  });
  return result;
};

export const insertData = async (data: Song) => {
  const result = await prisma.song.create({
    data,
    include: {
      Genre: {
        select: {
          id: true,
          genreName: true,
        },
      },
      SubGenre: {
        select: {
          id: true,
          subGenreName: true,
        },
      },
    },
  });

  return result;
};
export const editData = async (data: Song, id: string) => {
  const result = await prisma.song.update({
    data,
    where: {
      id: parseInt(id),
    },
    include: {
      Genre: {
        select: {
          id: true,
          genreName: true,
        },
      },
      SubGenre: {
        select: {
          id: true,
          subGenreName: true,
        },
      },
    },
  });

  return result;
};
export const deleteData = async (id: string) => {
  const find = await prisma.song.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  if (!find) return false;
  const result = await prisma.song.delete({
    where: {
      id: parseInt(id),
    },
  });

  return result;
};
