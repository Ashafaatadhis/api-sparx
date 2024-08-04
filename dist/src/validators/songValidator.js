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
exports.validate = exports.postValidationRules = exports.editValidationRules = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const express_validator_1 = require("express-validator");
const postValidationRules = () => {
    return [
        (0, express_validator_1.check)("title")
            .isString()
            .trim()
            .escape()
            .not()
            .isEmpty()
            .withMessage("Title is required"),
        (0, express_validator_1.check)("vocal")
            .not()
            .isEmpty()
            .withMessage("vocal is required")
            .isBoolean()
            .withMessage("vocal  boolean")
            .toBoolean(),
        (0, express_validator_1.check)("singer")
            .isString()
            .trim()
            .escape()
            .not()
            .isEmpty()
            .withMessage("Singer is required"),
        (0, express_validator_1.check)("duration")
            .isNumeric()
            .withMessage("duration Should Numeric")
            .not()
            .isEmpty()
            .withMessage("duration is required")
            .optional(),
        (0, express_validator_1.check)("genreId")
            .isNumeric()
            .withMessage("genreId Should Numeric")
            .not()
            .isEmpty()
            .withMessage("genreId is required")
            .toInt()
            .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield prisma_1.default.genre.findFirst({
                    where: {
                        id: parseInt(value),
                    },
                });
                if (!result)
                    throw new Error("Genre Not Found");
                return true;
            }
            catch (err) {
                throw new Error("Genre Not Found");
            }
        })),
        (0, express_validator_1.check)("subGenreId")
            .isNumeric()
            .withMessage("subGenreId Should Numeric")
            .not()
            .isEmpty()
            .withMessage("subGenreId is required")
            .toInt()
            .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield prisma_1.default.subGenre.findFirst({
                    where: {
                        id: parseInt(value),
                    },
                });
                if (!result)
                    throw new Error("Sub Genre Not Found");
                return true;
            }
            catch (err) {
                throw new Error("Sub Genre Not Found");
            }
        }))
            .optional(),
    ];
};
exports.postValidationRules = postValidationRules;
const editValidationRules = () => {
    return [
        (0, express_validator_1.check)("title")
            .isString()
            .trim()
            .escape()
            .not()
            .isEmpty()
            .withMessage("Title is required"),
        (0, express_validator_1.check)("duration")
            .isNumeric()
            .withMessage("duration Should Numeric")
            .not()
            .isEmpty()
            .withMessage("duration is required")
            .optional(),
        (0, express_validator_1.check)("vocal")
            .not()
            .isEmpty()
            .withMessage("vocal is required")
            .isBoolean()
            .withMessage("vocal  boolean")
            .toBoolean(),
        (0, express_validator_1.check)("singer")
            .isString()
            .trim()
            .escape()
            .not()
            .isEmpty()
            .withMessage("Singer is required"),
        (0, express_validator_1.check)("genreId")
            .isNumeric()
            .withMessage("genreId Should Numeric")
            .not()
            .isEmpty()
            .withMessage("genreId is required")
            .toInt()
            .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield prisma_1.default.genre.findFirst({
                    where: {
                        id: parseInt(value),
                    },
                });
                if (!result)
                    throw new Error("Genre Not Found");
                return true;
            }
            catch (err) {
                throw new Error("Genre Not Found");
            }
        })),
        (0, express_validator_1.check)("subGenreId")
            .isNumeric()
            .withMessage("subGenreId Should Numeric")
            .not()
            .isEmpty()
            .withMessage("subGenreId is required")
            .toInt()
            .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield prisma_1.default.subGenre.findFirst({
                    where: {
                        id: parseInt(value),
                    },
                });
                if (!result)
                    throw new Error("Sub Genre Not Found");
                return true;
            }
            catch (err) {
                throw new Error("Sub Genre Not Found");
            }
        }))
            .optional(),
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
