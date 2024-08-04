import prisma from "@/config/prisma";
import { DownloadPermission } from "@prisma/client";

export const getAll = async () => {
  const result = await prisma.downloadPermission.findMany();
  return result;
};
export const getDetail = async (id: string) => {
  const result = await prisma.downloadPermission.findFirst({
    where: {
      id: parseInt(id),
    },
  });
  return result;
};

export const insertData = async (data: DownloadPermission) => {
  const result = await prisma.downloadPermission.create({
    data,
  });

  return result;
};
export const editData = async (data: DownloadPermission, id: string) => {
  const result = await prisma.downloadPermission.update({
    data,
    where: {
      id: parseInt(id),
    },
  });

  return result;
};
export const deleteData = async (id: string) => {
  const find = await prisma.downloadPermission.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  if (!find) return false;
  const result = await prisma.downloadPermission.delete({
    where: {
      id: parseInt(id),
    },
  });

  return result;
};
