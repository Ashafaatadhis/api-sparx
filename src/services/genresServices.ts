import prisma from "../config/prisma";
import { Genre } from "@prisma/client";

export const getAll = async () => {
  const result = await prisma.genre.findMany();
  return result;
};
export const getDetail = async (id: string) => {
  const result = await prisma.genre.findFirst({
    where: {
      id: parseInt(id),
    },
  });
  return result;
};

export const insertData = async (data: Genre) => {
  const result = await prisma.genre.create({
    data,
  });

  return result;
};
export const editData = async (data: Genre, id: string) => {
  const result = await prisma.genre.update({
    data,
    where: {
      id: parseInt(id),
    },
  });

  return result;
};
export const deleteData = async (id: string) => {
  const find = await prisma.genre.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  if (!find) return false;
  const result = await prisma.genre.delete({
    where: {
      id: parseInt(id),
    },
  });

  return result;
};
