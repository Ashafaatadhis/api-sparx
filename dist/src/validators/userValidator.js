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
exports.checkUserIsExist = exports.editValidationRules = exports.validate = exports.postValidationRules = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const express_validator_1 = require("express-validator");
const postValidationRules = () => {
    return [
        (0, express_validator_1.check)("username")
            .isString()
            .trim()
            .not()
            .isEmpty()
            .escape()
            .withMessage("Username is required")
            .matches(/^[a-zA-Z0-9]+$/)
            .withMessage("Username should not contain special characters")
            .isLength({ min: 3, max: 30 })
            .withMessage("Username must be between 3 and 30 characters")
            .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const existingEntry = yield prisma_1.default.user.findFirst({
                    where: {
                        username: value,
                    },
                });
                if (existingEntry) {
                    throw new Error("Duplicate entry found in field username");
                }
            }
            catch (err) {
                throw new Error("Duplicate entry found in field username");
            }
        })),
        (0, express_validator_1.check)("email")
            .isString()
            .trim()
            .not()
            .isEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("This field must be email"),
        (0, express_validator_1.check)("password")
            .isString()
            .isLength({ min: 8, max: 64 })
            .escape()
            .withMessage("Password must be between 8 and 64 characters")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W]).*$/)
            .withMessage("Password must consist of at least one lowercase, one uppercase, one special character, and one number"),
        (0, express_validator_1.check)("role")
            .isString()
            .not()
            .isEmpty()
            .withMessage("role is required")
            .isIn(["ADMIN", "USER"])
            .withMessage("role value is should be ADMIN or USER"),
    ];
};
exports.postValidationRules = postValidationRules;
const editValidationRules = () => {
    return [
        (0, express_validator_1.check)("username")
            .isString()
            .trim()
            .not()
            .isEmpty()
            .escape()
            .withMessage("Username is required")
            .matches(/^[a-zA-Z0-9]+$/)
            .withMessage("Username should not contain special characters")
            .isLength({ min: 3, max: 30 })
            .withMessage("Username must be between 3 and 30 characters")
            .custom((value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
            var _b;
            try {
                const existingEntry = yield prisma_1.default.user.findFirst({
                    where: {
                        username: value,
                        NOT: { id: parseInt((_b = req.params) === null || _b === void 0 ? void 0 : _b.userId) },
                    },
                });
                if (existingEntry) {
                    throw new Error("Duplicate entry found in field username");
                }
                return true;
            }
            catch (err) {
                throw new Error("Duplicate entry found in field username");
            }
        }))
            .optional(),
        (0, express_validator_1.check)("email")
            .isString()
            .trim()
            .not()
            .isEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("This field must be email")
            .optional(),
        (0, express_validator_1.check)("password")
            .isString()
            .isLength({ min: 8, max: 64 })
            .escape()
            .withMessage("Password must be between 8 and 64 characters")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W]).*$/)
            .withMessage("Password must consist of at least one lowercase, one uppercase, one special character, and one number")
            .optional(),
        (0, express_validator_1.check)("role")
            .isString()
            .not()
            .isEmpty()
            .withMessage("role is required")
            .isIn(["ADMIN", "USER"])
            .withMessage("role value is should be ADMIN or USER")
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
const checkUserIsExist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(500).json({ status: 500, errors: errors.array() });
    }
    req.body = (0, express_validator_1.matchedData)(req, { onlyValidData: true });
    const { userId } = req.params;
    // Pengecekan di database
    const existingEntry = yield prisma_1.default.user.findFirst({
        where: {
            id: parseInt(userId),
        },
    });
    if (!existingEntry) {
        return res.status(404).json({
            status: 404,
            message: "User not found",
        });
    }
    next();
});
exports.checkUserIsExist = checkUserIsExist;
