import prisma from "../config/prisma";
import { Playlist, PlaylistSong } from "@prisma/client";

export const getAllByUserId = async (
  id: number,
  skip: number,
  take: number,
  genre: number,
  subgenre: number
) => {
  const result = await prisma.playlist.findMany({
    where: {
      createdBy: id,
      ...(genre > 0
        ? {
            playlistSong: {
              some: {
                Song: {
                  deletedAt: null,
                  genreId: genre,
                },
              },
            },
          }
        : {}),
      ...(subgenre > 0
        ? {
            playlistSong: {
              some: {
                Song: {
                  deletedAt: null,
                  genreId: genre,
                  subGenreId: subgenre,
                },
              },
            },
          }
        : {}),
    },
    skip,
    take,
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
      _count: {
        select: {
          playlistSong: {
            where: {
              deletedAt: null,
            },
          },
        },
      },
    },
  });

  const count = await prisma.playlist.count({
    where: {
      createdBy: id,
      ...(genre > 0
        ? {
            playlistSong: {
              some: {
                Song: {
                  deletedAt: null,
                  genreId: genre,
                },
              },
            },
          }
        : {}),
      ...(subgenre > 0
        ? {
            playlistSong: {
              some: {
                Song: {
                  deletedAt: null,
                  genreId: genre,
                  subGenreId: subgenre,
                },
              },
            },
          }
        : {}),
    },
  });
  return { count, result };
};
export const getDetailByUserId = async (id: string, userId: number) => {
  const result = await prisma.playlist.findFirst({
    where: {
      id: parseInt(id),
      createdBy: userId,
    },
    include: {
      playlistSong: {
        include: {
          Song: true,
        },
        where: {
          deletedAt: null,
        },
      },
      _count: {
        select: {
          playlistSong: {
            where: {
              deletedAt: null,
            },
          },
        },
      },
    },
  });
  return result;
};

export const insertData = async (data: Playlist) => {
  const result = await prisma.playlist.create({
    data,
  });

  return result;
};
export const editData = async (data: Playlist, id: string) => {
  const result = await prisma.playlist.update({
    data,
    where: {
      id: parseInt(id),
    },
  });

  return result;
};
export const deleteData = async (id: string) => {
  const find = await prisma.playlist.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  if (!find) return false;
  const result = await prisma.playlist.delete({
    where: {
      id: parseInt(id),
    },
  });

  return result;
};

export const insertDataSongToPlaylist = async (data: PlaylistSong) => {
  const result = await prisma.playlistSong.create({
    data,
  });

  return result;
};
export const getDataSongInPlaylist = async (
  playlistId: number,
  songId: number
) => {
  const result = await prisma.playlistSong.findFirst({
    where: {
      playlistId,
      songId,
    },
  });

  return result;
};

export const deleteSongInPlaylist = async (
  playlistId: number,
  songId: number
) => {
  const find = await prisma.playlistSong.findFirst({
    where: {
      playlistId,
      songId,
    },
  });

  if (!find) return false;
  const result = await prisma.playlistSong.deleteMany({
    where: {
      playlistId,
      songId,
    },
  });

  return result;
};
