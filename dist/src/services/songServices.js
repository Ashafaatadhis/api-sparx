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
exports.deleteData = exports.editData = exports.insertData = exports.getDetail = exports.getAll = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.song.findMany();
    return result;
});
exports.getAll = getAll;
const getDetail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.song.findFirst({
        where: {
            id: parseInt(id),
        },
    });
    return result;
});
exports.getDetail = getDetail;
const insertData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.song.create({
        data,
    });
    return result;
});
exports.insertData = insertData;
const editData = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.song.update({
        data,
        where: {
            id: parseInt(id),
        },
    });
    return result;
});
exports.editData = editData;
const deleteData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const find = yield prisma_1.default.song.findFirst({
        where: {
            id: parseInt(id),
        },
    });
    if (!find)
        return false;
    const result = yield prisma_1.default.song.delete({
        where: {
            id: parseInt(id),
        },
    });
    return result;
});
exports.deleteData = deleteData;
