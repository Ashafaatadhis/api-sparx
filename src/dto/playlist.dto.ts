import { Playlist, PlaylistSong } from "@prisma/client";

export const responsePlaylist = (data: Playlist) => {
  return {
    id: data.id,
    playListName: data.playlistName,
    createdBy: data.createdBy,
    isPublic: data.isPublic,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt,
  };
};
export const responsePlaylistSong = (data: PlaylistSong) => {
  return {
    id: data.id,
    playlistId: data.playlistId,
    songId: data.songId,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt,
  };
};
