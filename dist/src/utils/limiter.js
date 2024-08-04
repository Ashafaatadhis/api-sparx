"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 menit
    statusCode: 429,
    max: 100, // Batas 100 permintaan per windowMs
    message: "Terlalu banyak permintaan dari IP ini, coba lagi nanti.",
    standardHeaders: true, // Mengaktifkan header RateLimit
    legacyHeaders: false, // Menonaktifkan header X-RateLimit
});
exports.default = limiter;
