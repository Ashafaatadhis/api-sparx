import { deleteUser } from "../controllers/AuthController.test";
import { deleteGenre } from "../controllers/GenresController.test";
afterAll(async () => {
  await deleteUser();
  await deleteGenre();
});
