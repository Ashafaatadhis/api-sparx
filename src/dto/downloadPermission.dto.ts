import { DownloadPermission, Genre } from "@prisma/client";

export const responseDownloadPermission = (data: DownloadPermission) => {
  return {
    id: data.id,
    userId: data.userId,
    songId: data.songId,
    playlistId: data.playlistId,
    format: data.format,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt,
  };
};
