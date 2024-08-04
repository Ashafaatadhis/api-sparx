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
exports.checkDuplicateEntryOnUpdate = exports.checkDuplicateEntry = exports.validate = exports.postValidationRules = exports.editValidationRules = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const express_validator_1 = require("express-validator");
const postValidationRules = () => {
    return [
        (0, express_validator_1.check)("userId")
            .isNumeric()
            .withMessage("userId Should Numeric")
            .not()
            .isEmpty()
            .withMessage("userId is required")
            .toInt()
            .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield prisma_1.default.user.findFirst({
                    where: {
                        id: parseInt(value),
                    },
                });
                if (!result)
                    throw new Error("User Not Found");
                return true;
            }
            catch (err) {
                throw new Error("User Not Found");
            }
        })),
        (0, express_validator_1.check)("songId")
            .isNumeric()
            .withMessage("songId Should Numeric")
            .not()
            .isEmpty()
            .withMessage("songId is required")
            .toInt()
            .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield prisma_1.default.song.findFirst({
                    where: {
                        id: parseInt(value),
                    },
                });
                if (!result)
                    throw new Error("Song Not Found");
                return true;
            }
            catch (err) {
                throw new Error("Song Not Found");
            }
        }))
            .optional(),
        (0, express_validator_1.check)("playlistId")
            .isNumeric()
            .withMessage("playlistId Should Numeric")
            .not()
            .isEmpty()
            .withMessage("playlistId is required")
            .toInt()
            .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield prisma_1.default.playlist.findFirst({
                    where: {
                        id: parseInt(value),
                    },
                });
                if (!result)
                    throw new Error("Playlist Not Found");
                return true;
            }
            catch (err) {
                throw new Error("Playlist Not Found");
            }
        }))
            .optional(),
        (0, express_validator_1.check)("format")
            .isString()
            .not()
            .isEmpty()
            .withMessage("format is required")
            .isIn(["mp3", "wav"])
            .withMessage("The value of format should be mp3 or wav"),
    ];
};
exports.postValidationRules = postValidationRules;
const editValidationRules = () => {
    return [
        (0, express_validator_1.check)("userId")
            .isNumeric()
            .withMessage("userId Should Numeric")
            .not()
            .isEmpty()
            .withMessage("userId is required")
            .toInt()
            .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield prisma_1.default.user.findFirst({
                    where: {
                        id: parseInt(value),
                    },
                });
                if (!result)
                    throw new Error("User Not Found");
                return true;
            }
            catch (err) {
                throw new Error("User Not Found");
            }
        })),
        (0, express_validator_1.check)("songId")
            .isNumeric()
            .withMessage("songId Should Numeric")
            .not()
            .isEmpty()
            .withMessage("songId is required")
            .toInt()
            .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield prisma_1.default.song.findFirst({
                    where: {
                        id: parseInt(value),
                    },
                });
                if (!result)
                    throw new Error("Song Not Found");
                return true;
            }
            catch (err) {
                throw new Error("Song Not Found");
            }
        }))
            .optional(),
        (0, express_validator_1.check)("playlistId")
            .isNumeric()
            .withMessage("playlistId Should Numeric")
            .not()
            .isEmpty()
            .withMessage("playlistId is required")
            .toInt()
            .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield prisma_1.default.playlist.findFirst({
                    where: {
                        id: parseInt(value),
                    },
                });
                if (!result)
                    throw new Error("Playlist Not Found");
                return true;
            }
            catch (err) {
                throw new Error("Playlist Not Found");
            }
        }))
            .optional(),
        (0, express_validator_1.check)("format")
            .isString()
            .not()
            .isEmpty()
            .withMessage("format is required")
            .isIn(["mp3", "wav"])
            .withMessage("The value of format should be mp3 or wav"),
    ];
};
exports.editValidationRules = editValidationRules;
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(500).json({ status: 500, errors: errors.array() });
    }
    req.body = (0, express_validator_1.matchedData)(req, { onlyValidData: true });
    next();
};
exports.validate = validate;
const checkDuplicateEntry = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(500).json({ status: 500, errors: errors.array() });
    }
    req.body = (0, express_validator_1.matchedData)(req, { onlyValidData: true });
    const { userId, playlistId, songId } = req.body;
    // Pengecekan di database
    const existingEntry = yield prisma_1.default.downloadPermission.findFirst({
        where: {
            userId: userId,
            songId: songId || null,
            playlistId: playlistId || null,
        },
    });
    if (existingEntry) {
        return res.status(500).json({
            status: 500,
            errors: [
                { msg: "Duplicate entry in field userId, playlistId and songId" },
            ],
        });
    }
    next();
});
exports.checkDuplicateEntry = checkDuplicateEntry;
const checkDuplicateEntryOnUpdate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(500).json({ status: 500, errors: errors.array() });
    }
    req.body = (0, express_validator_1.matchedData)(req, { onlyValidData: true });
    const { id } = req.params;
    const { userId, playlistId, songId } = req.body;
    const isExist = yield prisma_1.default.downloadPermission.findFirst({
        where: {
            id: parseInt(id),
        },
    });
    if (!isExist) {
        return res.status(500).json({
            status: 500,
            message: "Download Permission not found",
        });
    }
    next();
});
exports.checkDuplicateEntryOnUpdate = checkDuplicateEntryOnUpdate;
