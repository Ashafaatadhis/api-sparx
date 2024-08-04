"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authValidator_1 = require("../validators/authValidator");
const router = express_1.default.Router();
router.post("/login", (0, authValidator_1.loginValidationRules)(), authValidator_1.validate, authController_1.login);
router.post("/register", (0, authValidator_1.registerValidationRules)(), authValidator_1.validate, authController_1.register);
router.delete("/logout", authController_1.logout);
exports.default = router;
