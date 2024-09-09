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
export const getDetail = async (link: string) => {
  const playlistDownload = await prisma.playlistDownload.findFirst({
    where: {
      link,
    },
  });
  console.log(playlistDownload);

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
      id: playlistDownload?.playlistId,
      isPublic: true,
    },
  });
  return result;
};
export const getAllSong = async (
  link: string,
  skip: number,
  take: number,
  genre: number,
  subgenre: number
) => {
  const playlistDownload = await prisma.playlistDownload.findFirst({
    select: {
      playlistId: true,
    },
    where: {
      link,
      expired: {
        gt: new Date(), // Memeriksa apakah expired lebih besar dari tanggal saat ini
      },
    },
  });
  console.log(playlistDownload, link);
  if (!playlistDownload) {
    return { count: 0, result: [] };
  }

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
          playlistId: playlistDownload?.playlistId,
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
          playlistId: playlistDownload?.playlistId,
          deletedAt: null,
        },
      },
    },
  });

  return { count, result };
};
