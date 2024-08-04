"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const genresController_1 = require("../controllers/genresController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const rbacMiddleware_1 = __importDefault(require("../middlewares/rbacMiddleware"));
const authValidator_1 = require("../validators/authValidator");
const genresValidator_1 = require("../validators/genresValidator");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", genresController_1.getAllController);
router.get("/:id", genresController_1.getDetailController);
router.post("/", (0, authMiddleware_1.authentication)(), (0, rbacMiddleware_1.default)(["ADMIN"], "create-genre"), (0, genresValidator_1.postValidationRules)(), authValidator_1.validate, genresController_1.postController);
router.put("/:id", (0, authMiddleware_1.authentication)(), (0, rbacMiddleware_1.default)(["ADMIN"], "update-genre"), (0, genresValidator_1.editValidationRules)(), authValidator_1.validate, genresController_1.updateController);
router.delete("/:id", (0, authMiddleware_1.authentication)(), (0, rbacMiddleware_1.default)(["ADMIN"], "delete-genre"), genresController_1.deleteController);
exports.default = router;
