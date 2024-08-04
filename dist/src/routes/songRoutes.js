"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const songController_1 = require("../controllers/songController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const rbacMiddleware_1 = __importDefault(require("../middlewares/rbacMiddleware"));
const authValidator_1 = require("../validators/authValidator");
const songValidator_1 = require("../validators/songValidator");
const songMiddleware_1 = require("../middlewares/songMiddleware");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", songController_1.getAllController);
router.get("/:id", songController_1.getDetailController);
router.post("/", (0, authMiddleware_1.authentication)(), (0, rbacMiddleware_1.default)(["ADMIN"], "create-genre"), (0, songMiddleware_1.checkAudio)("filePath", "POST"), (0, songMiddleware_1.checkImage)("coverSong"), (0, songValidator_1.postValidationRules)(), authValidator_1.validate, songController_1.postController);
router.put("/:id", (0, authMiddleware_1.authentication)(), (0, rbacMiddleware_1.default)(["ADMIN"], "update-genre"), (0, songMiddleware_1.checkAudio)("filePath", "EDIT"), (0, songMiddleware_1.checkImage)("coverSong"), (0, songValidator_1.editValidationRules)(), authValidator_1.validate, songController_1.updateController);
router.delete("/:id", (0, authMiddleware_1.authentication)(), (0, rbacMiddleware_1.default)(["ADMIN"], "delete-genre"), songController_1.deleteController);
exports.default = router;
