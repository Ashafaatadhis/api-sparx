"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const subGenresController_1 = require("../controllers/subGenresController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const rbacMiddleware_1 = __importDefault(require("../middlewares/rbacMiddleware"));
const authValidator_1 = require("../validators/authValidator");
const subGenresValidator_1 = require("../validators/subGenresValidator");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", subGenresController_1.getAllController);
router.get("/:id", subGenresController_1.getDetailController);
router.post("/", (0, authMiddleware_1.authentication)(), (0, rbacMiddleware_1.default)(["ADMIN"], "create-genre"), (0, subGenresValidator_1.postValidationRules)(), authValidator_1.validate, subGenresController_1.postController);
router.put("/:id", (0, authMiddleware_1.authentication)(), (0, rbacMiddleware_1.default)(["ADMIN"], "update-genre"), (0, subGenresValidator_1.editValidationRules)(), authValidator_1.validate, subGenresController_1.updateController);
router.delete("/:id", (0, authMiddleware_1.authentication)(), (0, rbacMiddleware_1.default)(["ADMIN"], "delete-genre"), subGenresController_1.deleteController);
exports.default = router;
