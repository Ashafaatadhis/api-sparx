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
export const getAllSong = async (id: string) => {
  const result = await prisma.playlistSong.findFirst({
    include: {
      Playlist: true,
      Song: true,
    },
    where: {
      playlistId: parseInt(id),
      Playlist: {
        isPublic: true,
      },
    },
  });

  return result;
};
