import prisma from "../config/prisma";
export const getAll = async () => {
  const result = await prisma.playlist.findMany({
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
};
export const getDetail = async (id: string) => {
  const result = await prisma.playlist.findFirst({
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
};
export const getAllSong = async (
  id: string,
  skip: number,
  take: number,
  genre: number,
  subgenre: number
) => {
  const result = await prisma.song.findMany({
    take,
    skip,
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
    where: {
      ...(genre > 0 ? { genreId: genre } : {}),
      ...(subgenre > 0 ? { genreId: genre, subGenreId: subgenre } : {}),
      playlistSong: {
        some: {
          playlistId: parseInt(id),
          deletedAt: null,
        },
      },
    },
  });
  const count = await prisma.song.count({
    where: {
      ...(genre > 0 ? { genreId: genre } : {}),
      ...(subgenre > 0 ? { genreId: genre, subGenreId: subgenre } : {}),
      playlistSong: {
        some: {
          playlistId: parseInt(id),
          deletedAt: null,
        },
      },
    },
  });

  return { count, result };
};
