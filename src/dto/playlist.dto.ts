import { Playlist, PlaylistLink, PlaylistSong, Prisma } from "@prisma/client";

type PlayListWithTotalSong = Prisma.PlaylistGetPayload<{
  where: {
    createdBy: number;
  };
  include: {
    PlaylistLink: {
      where: {
        deletedAt: null;
      };
    };
    playlistSong: {
      include: {
        Song: true;
      };
      where: {
        deletedAt: null;
      };
    };
    _count: {
      select: {
        playlistSong: {
          where: {
            deletedAt: null;
          };
        };
      };
    };
  };
}>;

export const responsePlaylist = (data: Playlist) => {
  return {
    id: data.id,
    playListName: data.playlistName,
    description: data.description,
    cover: data.cover,
    // totalSong: data.
    createdBy: data.createdBy,
    isPublic: data.isPublic,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt,
  };
};
export const responsePlaylistWithTotalSong = (data: PlayListWithTotalSong) => {
  return {
    id: data.id,
    playListName: data.playlistName,
    description: data.description,
    cover: data.cover,
    link: data.PlaylistLink?.[0],
    Songs: data.playlistSong.map((v) => v.Song),
    totalSong: data._count,
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
export const responsePlaylistShare = (data: PlaylistLink) => {
  return {
    id: data.id,
    playlistId: data.playlistId,
    link: data.link,
    expired: data.expired,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt,
  };
};
