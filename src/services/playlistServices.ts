import prisma from "@/config/prisma";
import { Playlist, PlaylistSong } from "@prisma/client";

export const getAllByUserId = async (id: number) => {
  const result = await prisma.playlist.findMany({
    where: {
      createdBy: id,
    },
  });
  return result;
};
export const getDetailByUserId = async (id: string, userId: number) => {
  const result = await prisma.playlist.findFirst({
    where: {
      id: parseInt(id),
      createdBy: userId,
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
