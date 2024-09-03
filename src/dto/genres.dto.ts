import { Genre, Prisma } from "@prisma/client";

type GenreWithSubGenre = Prisma.GenreGetPayload<{
  include: {
    subGenre: {
      where: {
        deletedAt: null;
      };
    };
  };
}>;

export const responseGenre = (data: Genre) => {
  return {
    id: data.id,

    genreName: data.genreName,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt,
  };
};
export const responseGenreWithSubGenre = (data: GenreWithSubGenre) => {
  return {
    id: data.id,
    SubGenre: data.subGenre,
    genreName: data.genreName,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt,
  };
};
