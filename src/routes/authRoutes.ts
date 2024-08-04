import express from "express";
import { login, register, logout } from "@/controllers/authController";
import {
  loginValidationRules,
  registerValidationRules,
  validate,
} from "@/validators/authValidator";

const router = express.Router();

router.post("/login", loginValidationRules(), validate, login);
router.post("/register", registerValidationRules(), validate, register);
router.delete("/logout", logout);

export default router;
