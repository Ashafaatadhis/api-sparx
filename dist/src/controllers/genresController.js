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
const genresServices_1 = require("../services/genresServices");
const genres_dto_1 = require("../dto/genres.dto");
const logger_1 = __importDefault(require("../utils/logger"));
const getAllController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, genresServices_1.getAll)();
        logger_1.default.info("Get All Success: Success to Get All Genres");
        return res.status(200).json({
            status: 200,
            message: "Succesfully Get All Genres",
            data: result.map((value) => {
                return (0, genres_dto_1.responseGenre)(value);
            }),
        });
    }
    catch (err) {
        console.log(err);
        logger_1.default.error("Get All Error: Failed to Get All Genres");
        return res
            .status(500)
            .json({ status: 500, message: "Failed to Get All Genres" });
    }
});
exports.getAllController = getAllController;
const getDetailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, genresServices_1.getDetail)(id);
        logger_1.default.info("Get Success: Success to Get Genre");
        return res.status(200).json({
            status: 200,
            message: "Succesfully Get Genre",
            data: result ? (0, genres_dto_1.responseGenre)(result) : null,
        });
    }
    catch (err) {
        logger_1.default.error("Get Error: Failed to Get Genre");
        return res
            .status(500)
            .json({ status: 500, message: "Failed to Get Genre" });
    }
});
exports.getDetailController = getDetailController;
const postController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, genresServices_1.insertData)(req.body);
        logger_1.default.info("Add Success: Success to Add New Genre");
        return res.status(201).json({
            status: 201,
            message: "Successfully Add New Genre",
            data: (0, genres_dto_1.responseGenre)(result),
        });
    }
    catch (err) {
        logger_1.default.error("Add Error: Failed to Add New Genre");
        return res
            .status(500)
            .json({ status: 500, message: "Failed to Add New Genre" });
    }
});
exports.postController = postController;
const updateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, genresServices_1.editData)(req.body, id);
        logger_1.default.error("Edit Success: Success to Edit This Genre");
        return res.status(200).json({
            status: 200,
            message: "Successfully Edit This Genre",
            data: (0, genres_dto_1.responseGenre)(result),
        });
    }
    catch (err) {
        logger_1.default.error("Edit Error: Failed to Edit This Genre");
        return res
            .status(500)
            .json({ status: 500, message: "Failed to Edit This Genre" });
    }
});
exports.updateController = updateController;
const deleteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!(yield (0, genresServices_1.deleteData)(id))) {
            logger_1.default.error("Delete Error: Failed to Delete This Genre");
            return res
                .status(500)
                .json({ status: 500, message: "Failed to Delete This Genre" });
        }
        logger_1.default.info("Delete Success: Success to Delete This Genre");
        return res.status(200).json({
            status: 200,
            message: "Successfully Delete This Genre",
        });
    }
    catch (err) {
        logger_1.default.error("Delete Error: Failed to Delete This Genre");
        return res
            .status(500)
            .json({ status: 500, message: "Failed to Delete This Genre" });
    }
});
exports.deleteController = deleteController;
