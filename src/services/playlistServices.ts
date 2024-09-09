import prisma from "../config/prisma";
import { Playlist, PlaylistDownload, PlaylistSong } from "@prisma/client";

export const getAllByUserId = async (
  skip: number,
  take: number,
  genre: number,
  subgenre: number
) => {
  const result = await prisma.playlist.findMany({
    where: {
      // createdBy: id,
      ...(genre > 0
        ? {
            playlistSong: {
              some: {
                Song: {
                  deletedAt: null,
                  genreId: genre,
                },
                deletedAt: null,
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
                deletedAt: null,
              },
            },
          }
        : {}),
    },
    skip,
    take,
    include: {
      playlistDownload: {
        where: {
          deletedAt: null,
        },
      },
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
  console.log(genre, result);
  const count = await prisma.playlist.count({
    where: {
      // createdBy: id,
      ...(genre > 0
        ? {
            playlistSong: {
              some: {
                Song: {
                  deletedAt: null,
                  genreId: genre,
                },
                deletedAt: null,
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
                deletedAt: null,
              },
            },
          }
        : {}),
    },
  });
  return { count, result };
};
export const getDetailByUserId = async (id: string) => {
  const result = await prisma.playlist.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      playlistDownload: {
        where: {
          deletedAt: null,
        },
      },
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
  console.log(result, id, "WOII");
  return result;
};

export const getAllSong = async (
  playlistId: number,
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
          playlistId,
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
          playlistId,
          deletedAt: null,
        },
      },
    },
  });

  return { count, result };
};

export const getDetailSharePlaylist = async (playlistId: number) => {
  const result = await prisma.playlistDownload.findFirst({
    where: {
      playlistId,
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
export const insertSharePlaylist = async (data: PlaylistDownload) => {
  const result = await prisma.playlistDownload.create({
    data,
  });

  return result;
};

export const editSharePlaylist = async (id: number, data: PlaylistDownload) => {
  const result = await prisma.playlistDownload.update({
    data: data,
    where: {
      id,
    },
  });

  return result;
};

export const deleteSharePlaylist = async (id: number) => {
  const find = await prisma.playlistDownload.findFirst({
    where: {
      id,
    },
  });

  if (!find) return false;
  const result = await prisma.playlistDownload.deleteMany({
    where: {
      id,
    },
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
