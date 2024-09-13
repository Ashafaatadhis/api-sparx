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
  const playlistDownload = await prisma.playlistLink.findFirst({
    where: {
      link: { contains: link },
    },
  });

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

  genre: number,
  subgenre: number
) => {
  const playlistLink = await prisma.playlistLink.findFirst({
    select: {
      playlistId: true,
    },
    where: {
      link: { contains: link },
      expired: {
        gt: new Date(), // Memeriksa apakah expired lebih besar dari tanggal saat ini
      },
    },
  });

  if (!playlistLink) {
    return { count: 0, result: [] };
  }

  const result = await prisma.song.findMany({
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
          playlistId: playlistLink?.playlistId,
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
          playlistId: playlistLink?.playlistId,
          deletedAt: null,
        },
      },
    },
  });

  console.log(result);

  return { count, result };
};
