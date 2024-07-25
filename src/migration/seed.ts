import prisma from "../config/prisma";
import { hashPassword } from "../utils/hashPassword";

const seed = async () => {
  let genPassword = await hashPassword("admin123");
  await prisma.user.create({
    data: {
      email: "admin@gmail.com",
      username: "admin123",
      password: (genPassword && genPassword) as string,
      role: "ADMIN",
    },
  });

  genPassword = await hashPassword("user1");
  await prisma.user.create({
    data: {
      email: "user1@gmail.com",
      username: "user1",
      password: (genPassword && genPassword) as string,
      role: "USER",
    },
  });
};

seed();
