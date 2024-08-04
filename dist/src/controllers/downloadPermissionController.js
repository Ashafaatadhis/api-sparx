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
exports.deleteController = exports.updateController = exports.postController = exports.getDetailController = exports.getAllController = void 0;
const downloadPermissionService_1 = require("../services/downloadPermissionService");
const logger_1 = __importDefault(require("../utils/logger"));
const downloadPermission_dto_1 = require("../dto/downloadPermission.dto");
const getAllController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, downloadPermissionService_1.getAll)();
        logger_1.default.info("Get All Success: Successfully retrieved download permissions");
        return res.status(200).json({
            status: 200,
            message: "Successfully retrieved download permissions",
            data: result.map((value) => {
                return (0, downloadPermission_dto_1.responseDownloadPermission)(value);
            }),
        });
    }
    catch (err) {
        logger_1.default.error("Get All Error: Failed to retrieve download permissions");
        return res.status(500).json({
            status: 500,
            message: "Failed to retrieve download permissions",
        });
    }
});
exports.getAllController = getAllController;
const getDetailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, downloadPermissionService_1.getDetail)(id);
        logger_1.default.info("Get Success: Successfully retrieved download permission");
        return res.status(200).json({
            status: 200,
            message: "Successfully retrieved download permission",
            data: result ? (0, downloadPermission_dto_1.responseDownloadPermission)(result) : null,
        });
    }
    catch (err) {
        logger_1.default.error("Get Error: Failed to retrieve download permissions");
        return res.status(500).json({
            status: 500,
            message: "Failed to retrieve download permissions",
        });
    }
});
exports.getDetailController = getDetailController;
const postController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, downloadPermissionService_1.insertData)(req.body);
        logger_1.default.info("Add Success: Successfully created download permission");
        return res.status(201).json({
            status: 201,
            message: "Successfully created download permission",
            data: (0, downloadPermission_dto_1.responseDownloadPermission)(result),
        });
    }
    catch (err) {
        logger_1.default.error("Add Error: Failed to create download permission");
        return res
            .status(500)
            .json({ status: 500, message: "Failed to create download permission" });
    }
});
exports.postController = postController;
const updateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, downloadPermissionService_1.editData)(req.body, id);
        logger_1.default.info("Edit Success: Successfully updated download permission");
        return res.status(200).json({
            status: 200,
            message: "Successfully updated download permission",
            data: (0, downloadPermission_dto_1.responseDownloadPermission)(result),
        });
    }
    catch (err) {
        console.log(err);
        logger_1.default.error("Edit Error: Failed to update download permission");
        return res
            .status(500)
            .json({ status: 500, message: "Failed to update download permission" });
    }
});
exports.updateController = updateController;
const deleteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!(yield (0, downloadPermissionService_1.deleteData)(id))) {
            logger_1.default.error("Delete Error: Failed to delete download permission");
            return res
                .status(500)
                .json({ status: 500, message: "Failed to delete download permission" });
        }
        logger_1.default.info("Delete Success: Successfully deleted download permission");
        return res.status(200).json({
            status: 200,
            message: "Successfully deleted download permission",
        });
    }
    catch (err) {
        logger_1.default.error("Delete Error: Failed to delete download permission");
        return res
            .status(500)
            .json({ status: 500, message: "Failed to delete download permission" });
    }
});
exports.deleteController = deleteController;
