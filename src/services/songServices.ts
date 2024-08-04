import prisma from "@/config/prisma";
import { Song } from "@prisma/client";

export const getAll = async () => {
  const result = await prisma.song.findMany();
  return result;
};
export const getDetail = async (id: string) => {
  const result = await prisma.song.findFirst({
    where: {
      id: parseInt(id),
    },
  });
  return result;
};

export const insertData = async (data: Song) => {
  const result = await prisma.song.create({
    data,
  });

  return result;
};
export const editData = async (data: Song, id: string) => {
  const result = await prisma.song.update({
    data,
    where: {
      id: parseInt(id),
    },
  });

  return result;
};
export const deleteData = async (id: string) => {
  const find = await prisma.song.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  if (!find) return false;
  const result = await prisma.song.delete({
    where: {
      id: parseInt(id),
    },
  });

  return result;
};
