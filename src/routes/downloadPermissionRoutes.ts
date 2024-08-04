import {
  deleteController,
  getAllController,
  getDetailController,
  postController,
  updateController,
} from "../controllers/downloadPermissionController";
import { authentication } from "../middlewares/authMiddleware";
import rbacMiddleware from "../middlewares/rbacMiddleware";
import {
  validate,
  editValidationRules,
  postValidationRules,
  checkDuplicateEntry,
  checkDuplicateEntryOnUpdate,
} from "../validators/downloadPermissionvalidator";

import express from "express";

const router = express.Router();

router.get(
  "/",
  authentication(),
  rbacMiddleware(["ADMIN"], "read-genre"),
  getAllController
);
router.get(
  "/:id",
  authentication(),
  rbacMiddleware(["ADMIN"], "read-genre"),
  getDetailController
);
router.post(
  "/",
  authentication(),
  rbacMiddleware(["ADMIN"], "create-genre"),

  postValidationRules(),
  checkDuplicateEntry,
  postController
);
router.put(
  "/:id",
  authentication(),
  rbacMiddleware(["ADMIN"], "update-genre"),
  editValidationRules(),
  checkDuplicateEntryOnUpdate,
  updateController
);
router.delete(
  "/:id",
  authentication(),
  rbacMiddleware(["ADMIN"], "delete-genre"),

  deleteController
);

export default router;
