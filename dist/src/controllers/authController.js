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
exports.logout = exports.login = exports.register = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const authServices_1 = require("../services/authServices");
const jwt_1 = require("../utils/jwt");
const user_dto_1 = require("../dto/user.dto");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const regist = yield (0, authServices_1.register)(req.body);
        if (!regist) {
            logger_1.default.error("Register Error: username is existed");
            return res
                .status(400)
                .json({ status: 400, message: "Failed to register user" });
        }
        logger_1.default.info("Register Success: User Success Registered");
        return res.status(201).json({
            status: 201,
            message: "Successfully registered user",
            data: (0, user_dto_1.responseUser)(regist),
        });
        // return sendResponse(res, 200, "Successfully registered new user!");
    }
    catch (error) {
        logger_1.default.error("Register Error: Failed to register user");
        return res
            .status(400)
            .json({ status: 400, message: "Failed to register user" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, authServices_1.login)(req.body);
        if (!user) {
            logger_1.default.error("Login Error: Invalid username or password");
            return res
                .status(401)
                .json({ status: 401, message: "Invalid username or password" });
        }
        const token = (0, jwt_1.sign)(user);
        res.cookie("token", token, {
            maxAge: 3 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return res.status(200).json({
            status: 200,
            message: "Successfully logged in",
            data: {
                token,
                user: (0, user_dto_1.responseUser)(user),
            },
        });
    }
    catch (err) {
        logger_1.default.error("Login Error: Failed to login");
        return res.status(400).json({ status: 400, message: "Failed to login" });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.token)) {
        logger_1.default.error("Logout Error: Failed to logout");
        return res
            .status(401)
            .json({ status: 401, message: "Invalid or expired token" });
    }
    res.clearCookie("token");
    return res
        .status(200)
        .json({ status: 200, message: "Successfully logged out" });
});
exports.logout = logout;
