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
exports.login = exports.register = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const hashPassword_1 = require("../utils/hashPassword");
const register = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const checkUsernameExist = yield prisma_1.default.user.findFirst({
        where: { username: data.username },
    });
    if (checkUsernameExist) {
        return false;
    }
    const genPassword = yield (0, hashPassword_1.hashPassword)(data.password);
    if (!genPassword) {
        return false;
    }
    return yield prisma_1.default.user.create({
        data: {
            email: data.email,
            password: genPassword,
            role: "USER",
            username: data.username,
        },
    });
});
exports.register = register;
const login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const checkUsernameExist = yield prisma_1.default.user.findFirst({
        where: { username: data.username },
    });
    if (!checkUsernameExist) {
        return false;
    }
    if (!(yield (0, hashPassword_1.verifyPassword)(checkUsernameExist.password, data.password))) {
        return false;
    }
    return checkUsernameExist;
});
exports.login = login;
