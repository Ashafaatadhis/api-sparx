import express from "express";
import {
  editController,
  postController,
  deleteController,
  getAllController,
  getDetailController,
} from "@/controllers/userController";
import {
  postValidationRules,
  validate,
  editValidationRules,
  checkUserIsExist,
} from "@/validators/userValidator";
import { authentication } from "@/middlewares/authMiddleware";
import rbacMiddleware from "@/middlewares/rbacMiddleware";

const router = express.Router();

router.get(
  "/",
  authentication(),
  rbacMiddleware(["ADMIN"], "read-genre"),
  getAllController
);
router.get(
  "/:userId",
  authentication(),
  rbacMiddleware(["ADMIN"], "read-genre"),
  checkUserIsExist,
  getDetailController
);
router.post(
  "/",
  authentication(),
  rbacMiddleware(["ADMIN"], "create-genre"),
  postValidationRules(),
  validate,
  postController
);
router.put(
  "/:userId",
  authentication(),
  rbacMiddleware(["ADMIN"], "update-genre"),
  editValidationRules(),
  checkUserIsExist,
  editController
);
router.delete(
  "/:userId",
  authentication(),
  rbacMiddleware(["ADMIN"], "delete-genre"),
  checkUserIsExist,
  deleteController
);

export default router;
