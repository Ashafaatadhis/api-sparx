import prisma from "../config/prisma";
import { hashPassword } from "../utils/hashPassword";

const seed = async () => {
  // const res = await prisma.song.findMany({
  //   where: {
  //     Ge
  //   }
  // });
  // console.log(res);
  // await prisma.playlist.create({
  //   data: {
  //     isPublic: true,
  //     playlistName: "Dangdut",
  //     createdBy: 418,
  //   },
  // });
  // await prisma.user.deleteMany();
  let genPassword = await hashPassword("admin123");
  await prisma.user.create({
    data: {
      email: "admin@gmail.com",
      username: "admin",
      password: (genPassword && genPassword) as string,
      role: "ADMIN",
    },
  });
  // genPassword = await hashPassword("testing123");
  // await prisma.user.create({
  //   data: {
  //     email: "testing1@gmail.com",
  //     username: "testing1",
  //     password: (genPassword && genPassword) as string,
  //     role: "USER",
  //   },
  // });
  // genPassword = await hashPassword("testing123");
  // await prisma.user.create({
  //   data: {
  //     email: "testing2@gmail.com",
  //     username: "testing2",
  //     password: (genPassword && genPassword) as string,
  //     role: "USER",
  //   },
  // });
};

seed();
