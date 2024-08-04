"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const downloadPermissionController_1 = require("../controllers/downloadPermissionController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const rbacMiddleware_1 = __importDefault(require("../middlewares/rbacMiddleware"));
const downloadPermissionvalidator_1 = require("../validators/downloadPermissionvalidator");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (0, authMiddleware_1.authentication)(), (0, rbacMiddleware_1.default)(["ADMIN"], "read-genre"), downloadPermissionController_1.getAllController);
router.get("/:id", (0, authMiddleware_1.authentication)(), (0, rbacMiddleware_1.default)(["ADMIN"], "read-genre"), downloadPermissionController_1.getDetailController);
router.post("/", (0, authMiddleware_1.authentication)(), (0, rbacMiddleware_1.default)(["ADMIN"], "create-genre"), (0, downloadPermissionvalidator_1.postValidationRules)(), downloadPermissionvalidator_1.checkDuplicateEntry, downloadPermissionController_1.postController);
router.put("/:id", (0, authMiddleware_1.authentication)(), (0, rbacMiddleware_1.default)(["ADMIN"], "update-genre"), (0, downloadPermissionvalidator_1.editValidationRules)(), downloadPermissionvalidator_1.checkDuplicateEntryOnUpdate, downloadPermissionController_1.updateController);
router.delete("/:id", (0, authMiddleware_1.authentication)(), (0, rbacMiddleware_1.default)(["ADMIN"], "delete-genre"), downloadPermissionController_1.deleteController);
exports.default = router;
