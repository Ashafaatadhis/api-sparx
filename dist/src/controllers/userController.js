"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDetailController = exports.getAllController = exports.deleteController = exports.editController = exports.postController = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const userServices_1 = require("../services/userServices");
const user_dto_1 = require("../dto/user.dto");
const postController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const regist = yield (0, userServices_1.createNewUser)(req.body);
        logger_1.default.info("Add Success: Successfully created user");
        return res.status(201).json({
            status: 201,
            message: "Successfully created user",
            data: (0, user_dto_1.responseUser)(regist),
        });
    }
    catch (error) {
        logger_1.default.error(`Add Error: ${error.message}`);
        return res
            .status(400)
            .json({ status: 400, message: "Failed to create user" });
    }
});
exports.postController = postController;
const editController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield (0, userServices_1.editUser)(req.body, parseInt((_a = req.params) === null || _a === void 0 ? void 0 : _a.userId));
        logger_1.default.info("Edit Success: Successfully updated user profile");
        return res.status(201).json({
            status: 200,
            message: "Successfully updated user profile",
            data: (0, user_dto_1.responseUser)(user),
        });
    }
    catch (err) {
        logger_1.default.error(`Edit Error: ${err.message}`);
        return res
            .status(400)
            .json({ status: 400, message: "Failed to edit user" });
    }
});
exports.editController = editController;
const deleteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        yield (0, userServices_1.deleteUser)(parseInt((_a = req.params) === null || _a === void 0 ? void 0 : _a.userId));
        logger_1.default.info("Delete Success: Successfully deleted user");
        return res.status(201).json({
            status: 200,
            message: "Successfully deleted user",
        });
    }
    catch (err) {
        logger_1.default.error(`Delete Error: ${err.message}`);
        return res
            .status(400)
            .json({ status: 400, message: "Failed to delete user" });
    }
});
exports.deleteController = deleteController;
const getAllController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, userServices_1.getAllUser)();
        logger_1.default.info("Get All Success: Successfully retrieved all users");
        return res.status(201).json({
            status: 200,
            message: "Successfully retrieved all users",
            data: result.map((value) => {
                return (0, user_dto_1.responseUser)(value);
            }),
        });
    }
    catch (err) {
        logger_1.default.error(`Get All Error: ${err.message}`);
        return res
            .status(400)
            .json({ status: 400, message: "Failed to retrieve all users" });
    }
});
exports.getAllController = getAllController;
const getDetailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = yield (0, userServices_1.getDetailUser)(parseInt((_a = req.params) === null || _a === void 0 ? void 0 : _a.userId));
        logger_1.default.info("Get All Success: Successfully retrieved user profile");
        return res.status(201).json({
            status: 200,
            message: "Successfully retrieved user profile",
            data: (0, user_dto_1.responseUser)(result),
        });
    }
    catch (err) {
        logger_1.default.error(`Get All Error: ${err.message}`);
        return res
            .status(400)
            .json({ status: 400, message: "Failed to retrieve user profile" });
    }
});
exports.getDetailController = getDetailController;
