import { Genre } from "@prisma/client";

export const responseGenre = (data: Genre) => {
  return {
    id: data.id,
    genreName: data.genreName,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt,
  };
};
