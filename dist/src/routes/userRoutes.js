"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userValidator_1 = require("../validators/userValidator");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const rbacMiddleware_1 = __importDefault(require("../middlewares/rbacMiddleware"));
const router = express_1.default.Router();
router.get("/", (0, authMiddleware_1.authentication)(), (0, rbacMiddleware_1.default)(["ADMIN"], "read-genre"), userController_1.getAllController);
router.get("/:userId", (0, authMiddleware_1.authentication)(), (0, rbacMiddleware_1.default)(["ADMIN"], "read-genre"), userValidator_1.checkUserIsExist, userController_1.getDetailController);
router.post("/", (0, authMiddleware_1.authentication)(), (0, rbacMiddleware_1.default)(["ADMIN"], "create-genre"), (0, userValidator_1.postValidationRules)(), userValidator_1.validate, userController_1.postController);
router.put("/:userId", (0, authMiddleware_1.authentication)(), (0, rbacMiddleware_1.default)(["ADMIN"], "update-genre"), (0, userValidator_1.editValidationRules)(), userValidator_1.checkUserIsExist, userController_1.editController);
router.delete("/:userId", (0, authMiddleware_1.authentication)(), (0, rbacMiddleware_1.default)(["ADMIN"], "delete-genre"), userValidator_1.checkUserIsExist, userController_1.deleteController);
exports.default = router;
