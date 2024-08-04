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
exports.getDetailUser = exports.getAllUser = exports.deleteUser = exports.editUser = exports.createNewUser = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const hashPassword_1 = require("../utils/hashPassword");
const createNewUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const genPassword = yield (0, hashPassword_1.hashPassword)(data.password);
    if (!genPassword) {
        throw new Error("Error occurs when generate password");
    }
    return yield prisma_1.default.user.create({
        data: {
            email: data.email,
            password: genPassword,
            role: data.role,
            username: data.username,
        },
    });
});
exports.createNewUser = createNewUser;
const editUser = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    if (data === null || data === void 0 ? void 0 : data.password) {
        const genPassword = yield (0, hashPassword_1.hashPassword)(data.password);
        if (!genPassword) {
            throw new Error("Error occurs when generate password");
        }
        data.password = genPassword;
    }
    const result = yield prisma_1.default.user.update({
        data,
        where: {
            id,
        },
    });
    if (!result)
        throw new Error("Error occurs when update user");
    return result;
});
exports.editUser = editUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.delete({
        where: {
            id,
        },
    });
    if (!result)
        throw new Error("Error occurs when update user");
    return result;
});
exports.deleteUser = deleteUser;
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany();
    if (!result)
        throw new Error("Error occurs when get all user");
    return result;
});
exports.getAllUser = getAllUser;
const getDetailUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findFirst({
        where: {
            id,
        },
    });
    if (!result)
        throw new Error("Error occurs when get detail user");
    return result;
});
exports.getDetailUser = getDetailUser;
