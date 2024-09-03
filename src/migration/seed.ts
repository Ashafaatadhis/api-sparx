import prisma from "../config/prisma";
import { hashPassword } from "../utils/hashPassword";

const seed = async () => {
  // const popSubGenres = [
  //   "Pop Rock",
  //   "Electropop",
  //   "Teen Pop",
  //   "Hip Pop (Pop Rap)",
  //   "Bubblegum Pop",
  //   "Country Pop",
  //   "Folk Pop",
  //   "Sunshine Pop",
  //   "Dance-pop",
  //   "Dream Pop",
  //   "Synth-pop",
  //   "Indie Pop",
  //   "Latin Pop",
  //   "Jazz-pop",
  //   "Baroque Pop",
  //   "Art Pop",
  //   "Alternative Pop",
  //   "Experimental Pop",
  //   "Hyperpop",
  //   "Chillwave",
  // ];
  // const a = await prisma.genre.create({
  //   data: {
  //     genreName: "Pop",
  //   },
  // });
  // for (let i = 0; i < popSubGenres.length; i++) {
  //   await prisma.subGenre.create({
  //     data: {
  //       subGenreName: popSubGenres[i],
  //       genreId: a.id,
  //     },
  //   });
  // }
  // const res = await prisma.song.findMany({
  //   where: {
  //     Ge
  //   }
  // });
  // console.log(res);
  for (let i = 0; i < 20; i++) {
    await prisma.playlist.create({
      data: {
        cover: "test",
        description: `test${i + 1}`,
        isPublic: true,
        playlistName: `test${i + 1}`,
        createdBy: 1,
      },
    });
  }
  // await prisma.$queryRaw`DELETE FROM Playlist`;
  // await prisma.$queryRaw`DELETE FROM Song`;
  // await prisma.user.deleteMany();
  // let genPassword = await hashPassword("admin123");
  // await prisma.user.create({
  //   data: {
  //     email: "admin@gmail.com",
  //     username: "admin",
  //     password: (genPassword && genPassword) as string,
  //     role: "ADMIN",
  //   },
  // });
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
