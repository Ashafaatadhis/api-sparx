import { SubGenre } from "@prisma/client";

interface SubGenreWithGenreName extends SubGenre {
  Genre?: {
    genreName: string;
  };
}

export const responseSubGenre = (data: SubGenreWithGenreName) => {
  return {
    id: data.id,
    subGenreName: data.subGenreName,
    genreName: data.Genre?.genreName,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt,
  };
};
