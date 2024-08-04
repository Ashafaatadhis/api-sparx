import {
  deleteController,
  getAllController,
  getDetailController,
  postController,
  updateController,
} from "../controllers/subGenresController";
import { authentication } from "../middlewares/authMiddleware";
import rbacMiddleware from "../middlewares/rbacMiddleware";
import { validate } from "../validators/authValidator";
import {
  postValidationRules,
  editValidationRules,
} from "../validators/subGenresValidator";
import express from "express";

const router = express.Router();

router.get("/", getAllController);
router.get("/:id", getDetailController);
router.post(
  "/",
  authentication(),
  rbacMiddleware(["ADMIN"], "create-genre"),
  postValidationRules(),
  validate,
  postController
);
router.put(
  "/:id",
  authentication(),
  rbacMiddleware(["ADMIN"], "update-genre"),
  editValidationRules(),
  validate,
  updateController
);
router.delete(
  "/:id",
  authentication(),
  rbacMiddleware(["ADMIN"], "delete-genre"),

  deleteController
);

export default router;
