import prisma from "@/config/prisma";

import { hashPassword, verifyPassword } from "@/utils/hashPassword";
import { User } from "@prisma/client";

export const createNewUser = async (data: User) => {
  const genPassword = await hashPassword(data.password);
  if (!genPassword) {
    throw new Error("Error occurs when generate password");
  }

  return await prisma.user.create({
    data: {
      email: data.email,
      password: genPassword as string,
      role: data.role,
      username: data.username,
    },
  });
};

export const editUser = async (data: User, id: number) => {
  if (data?.password) {
    const genPassword = await hashPassword(data.password);
    if (!genPassword) {
      throw new Error("Error occurs when generate password");
    }
    data.password = genPassword as string;
  }

  const result = await prisma.user.update({
    data,
    where: {
      id,
    },
  });

  if (!result) throw new Error("Error occurs when update user");
  return result;
};

export const deleteUser = async (id: number) => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });

  if (!result) throw new Error("Error occurs when update user");
  return result;
};

export const getAllUser = async () => {
  const result = await prisma.user.findMany();

  if (!result) throw new Error("Error occurs when get all user");
  return result;
};
export const getDetailUser = async (id: number) => {
  const result = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!result) throw new Error("Error occurs when get detail user");
  return result;
};
