import prisma from "@/config/prisma";

import { hashPassword, verifyPassword } from "@/utils/hashPassword";
import { User } from "@prisma/client";

export const register = async (data: User) => {
  const checkUsernameExist = await prisma.user.findFirst({
    where: { username: data.username },
  });

  if (checkUsernameExist) {
    return false;
  }

  const genPassword = await hashPassword(data.password);
  if (!genPassword) {
    return false;
  }

  return await prisma.user.create({
    data: {
      email: data.email,
      password: genPassword as string,
      role: "USER",
      username: data.username,
    },
  });
};

export const login = async (data: User) => {
  const checkUsernameExist = await prisma.user.findFirst({
    where: { username: data.username },
  });

  if (!checkUsernameExist) {
    return false;
  }

  if (!(await verifyPassword(checkUsernameExist.password, data.password))) {
    return false;
  }

  return checkUsernameExist;
};
