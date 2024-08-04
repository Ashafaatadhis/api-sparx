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
const prisma_1 = __importDefault(require("../config/prisma"));
const hashPassword_1 = require("../utils/hashPassword");
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    let genPassword = yield (0, hashPassword_1.hashPassword)("admin123");
    yield prisma_1.default.user.create({
        data: {
            email: "admin@gmail.com",
            username: "admin",
            password: (genPassword && genPassword),
            role: "ADMIN",
        },
    });
    genPassword = yield (0, hashPassword_1.hashPassword)("testing123");
    yield prisma_1.default.user.create({
        data: {
            email: "testing1@gmail.com",
            username: "testing1",
            password: (genPassword && genPassword),
            role: "USER",
        },
    });
    genPassword = yield (0, hashPassword_1.hashPassword)("testing123");
    yield prisma_1.default.user.create({
        data: {
            email: "testing2@gmail.com",
            username: "testing2",
            password: (genPassword && genPassword),
            role: "USER",
        },
    });
});
seed();
