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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
prisma.$use((params, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (params.action === "findMany" ||
        params.action === "findFirst" ||
        params.action === "findUnique" ||
        params.action === "findCount") {
        // Tambahkan filter untuk mengambil data yang belum dihapus (deletedAt = null)
        params.args = params.args || {};
        params.args.where = params.args.where || {};
        // Tambahkan filter untuk mengambil data yang belum dihapus (deletedAt = null)
        params.args.where.deletedAt = null;
    }
    if (params.action == "delete" && !params.args.ignoreMiddleware) {
        // Delete queries
        // Change action to an update
        params.action = "update";
        params.args["data"] = { deletedAt: new Date().toISOString() };
    }
    if (params.action == "deleteMany" && !params.args.ignoreMiddleware) {
        // Delete many queries
        params.action = "updateMany";
        if (params.args.data != undefined) {
            params.args.data["deletedAt"] = new Date().toISOString();
        }
        else {
            params.args["data"] = { deletedAt: new Date().toISOString() };
        }
    }
    return next(params);
}));
exports.default = prisma;
