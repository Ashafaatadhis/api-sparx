import prisma from "@/config/prisma";
import { SubGenre } from "@prisma/client";

export const getAll = async () => {
  const result = await prisma.subGenre.findMany({
    include: { Genre: { select: { genreName: true } } },
  });

  return result;
};
export const getDetail = async (id: string) => {
  const result = await prisma.subGenre.findFirst({
    include: { Genre: { select: { genreName: true } } },
    where: {
      id: parseInt(id),
    },
  });
  return result;
};

export const insertData = async (data: SubGenre) => {
  const result = await prisma.subGenre.create({
    data,
  });

  return result;
};
export const editData = async (data: SubGenre, id: string) => {
  const result = await prisma.subGenre.update({
    data,
    where: {
      id: parseInt(id),
    },
  });

  return result;
};
export const deleteData = async (id: string) => {
  const find = await prisma.subGenre.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  if (!find) return false;

  const result = await prisma.subGenre.delete({
    where: {
      id: parseInt(id),
    },
  });

  return result;
};
