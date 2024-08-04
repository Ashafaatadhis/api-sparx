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
const songServices_1 = require("../services/songServices");
const song_dto_1 = require("../dto/song.dto");
const logger_1 = __importDefault(require("../utils/logger"));
const uploadFile_1 = require("../utils/uploadFile");
const deleteFiles_1 = __importDefault(require("../utils/deleteFiles"));
const getAllController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, songServices_1.getAll)();
        logger_1.default.info("Get All Success: Success to Get All Genres");
        return res.status(200).json({
            status: 200,
            message: "Succesfully Get All Genres",
            data: result.map((value) => {
                return (0, song_dto_1.responseSong)(value);
            }),
        });
    }
    catch (err) {
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
        const result = yield (0, songServices_1.getDetail)(id);
        logger_1.default.info("Get Success: Success to Get Genre");
        return res.status(200).json({
            status: 200,
            message: "Succesfully Get Genre",
            data: result ? (0, song_dto_1.responseSong)(result) : null,
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
    var _a, _b, _c, _d, _e;
    try {
        // check jika filepath dan coversong bukan file multiple
        if (Array.isArray((_a = req.files) === null || _a === void 0 ? void 0 : _a.filePath) ||
            Array.isArray((_b = req.files) === null || _b === void 0 ? void 0 : _b.coverSong)) {
            logger_1.default.error("Add Error: Failed to upload New song, please upload single file");
            return res
                .status(500)
                .json({ status: 500, message: "Please upload single file" });
        }
        // upload filePath / music ke cloudinary
        const single = yield (0, uploadFile_1.uploadSingle)((_c = req.files) === null || _c === void 0 ? void 0 : _c.filePath, "song");
        if (!single) {
            logger_1.default.error("Add Error: Failed to upload File");
            return res
                .status(500)
                .json({ status: 500, message: "Failed to upload a file" });
        }
        // jika coverSong ada, maka upload ke cloudinary
        if ((_d = req.files) === null || _d === void 0 ? void 0 : _d.coverSong) {
            const coverSong = yield (0, uploadFile_1.uploadSingle)(req.files.coverSong, "coverSong");
            if (!coverSong) {
                logger_1.default.error("Add Error: Failed to upload File");
                return res
                    .status(500)
                    .json({ status: 500, message: "Failed to upload a file" });
            }
            // proses memasukkan coverSong url ke body
            req.body.coverSong = coverSong.secure_url;
        }
        // memasukkan url lagu dan userId yang ngeupload ke body
        req.body.filePath = single.secure_url;
        req.body.uploadedBy = (_e = req.user) === null || _e === void 0 ? void 0 : _e.sub;
        const result = yield (0, songServices_1.insertData)(req.body);
        logger_1.default.info("Add Success: Success to Add New Song");
        return res.status(201).json({
            status: 201,
            message: "Successfully Add New Song",
            data: (0, song_dto_1.responseSong)(result),
        });
    }
    catch (err) {
        console.log(err);
        logger_1.default.error("Add Error: Failed to Add New Song");
        return res
            .status(500)
            .json({ status: 500, message: "Failed to Add New Song" });
    }
});
exports.postController = postController;
const updateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const { id } = req.params;
        const song = yield (0, songServices_1.getDetail)(id);
        // check jika filepath dan coversong bukan file multiple
        if (Array.isArray((_a = req.files) === null || _a === void 0 ? void 0 : _a.filePath) ||
            Array.isArray((_b = req.files) === null || _b === void 0 ? void 0 : _b.coverSong)) {
            logger_1.default.error("Add Error: Failed to upload New song, please upload single file");
            return res
                .status(500)
                .json({ status: 500, message: "Please upload single file" });
        }
        if (!song) {
            logger_1.default.error("Edit Error: Song not found");
            return res.status(500).json({ status: 500, message: "Song not found" });
        }
        // jika file lagu ada, maka upload ke cloudinary
        if ((_c = req.files) === null || _c === void 0 ? void 0 : _c.filePath) {
            const single = yield (0, uploadFile_1.uploadSingle)(req.files.filePath, "song");
            if (!single) {
                logger_1.default.error("Add Error: Failed to upload File");
                return res
                    .status(500)
                    .json({ status: 500, message: "Failed to upload a file" });
            }
            if (song.filePath)
                yield (0, deleteFiles_1.default)(song.filePath);
            req.body.filePath = single.secure_url;
        }
        // jika coverSong ada, maka upload ke cloudinary
        if ((_d = req.files) === null || _d === void 0 ? void 0 : _d.coverSong) {
            const coverSong = yield (0, uploadFile_1.uploadSingle)(req.files.coverSong, "coverSong");
            if (!coverSong) {
                logger_1.default.error("Add Error: Failed to upload File");
                return res
                    .status(500)
                    .json({ status: 500, message: "Failed to upload a file" });
            }
            if (song.coverSong)
                yield (0, deleteFiles_1.default)(song.coverSong);
            // proses memasukkan coverSong url ke body
            req.body.coverSong = coverSong.secure_url;
        }
        const result = yield (0, songServices_1.editData)(req.body, id);
        logger_1.default.error("Edit Success: Success to Edit This Song");
        return res.status(200).json({
            status: 200,
            message: "Successfully Edit This Song",
            data: (0, song_dto_1.responseSong)(result),
        });
    }
    catch (err) {
        logger_1.default.error("Edit Error: Failed to Edit This Song");
        return res
            .status(500)
            .json({ status: 500, message: "Failed to Edit This Song" });
    }
});
exports.updateController = updateController;
const deleteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const song = yield (0, songServices_1.getDetail)(id);
        if (!song) {
            logger_1.default.error("Delete Error: Song not found");
            return res.status(500).json({ status: 500, message: "Song not found" });
        }
        if (!(yield (0, songServices_1.deleteData)(id))) {
            logger_1.default.error("Delete Error: Failed to Delete This Song");
            return res
                .status(500)
                .json({ status: 500, message: "Failed to Delete This Song" });
        }
        if (song.filePath)
            yield (0, deleteFiles_1.default)(song.filePath);
        if (song.coverSong)
            yield (0, deleteFiles_1.default)(song.coverSong);
        logger_1.default.info("Delete Success: Success to Delete This Song");
        return res.status(200).json({
            status: 200,
            message: "Successfully Delete This Song",
        });
    }
    catch (err) {
        logger_1.default.error("Delete Error: Failed to Delete This Song");
        return res
            .status(500)
            .json({ status: 500, message: "Failed to Delete This Song" });
    }
});
exports.deleteController = deleteController;
