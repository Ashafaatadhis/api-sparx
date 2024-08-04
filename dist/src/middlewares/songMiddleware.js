"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.checkImage = exports.checkAudio = void 0;
const mm = __importStar(require("music-metadata"));
const path_1 = __importDefault(require("path"));
const checkAudio = (form, type) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const file = req.files && req.files[form];
        if (type === "POST") {
            if (!file) {
                return res
                    .status(500)
                    .json({ status: 500, message: `${form} is Requirements` });
            }
        }
        else {
            next();
            return;
        }
        const extension = path_1.default.extname(file.name).toLowerCase();
        const mimeType = file.mimetype;
        if (![".mp3", ".wav"].includes(extension) ||
            !["audio/mpeg", "audio/wave"].includes(mimeType)) {
            return res
                .status(500)
                .json({ status: 500, message: `${form} must be in MP3 or WAV Format` });
        }
        const metadata = yield mm.parseBuffer(file.data, "audio/mpeg");
        req.body.duration = ((_a = metadata.format) === null || _a === void 0 ? void 0 : _a.duration)
            ? metadata.format.duration
            : 0;
        next();
    });
};
exports.checkAudio = checkAudio;
const checkImage = (form) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const file = req.files && req.files[form];
        if (file) {
            const extension = path_1.default.extname(file.name).toLowerCase();
            const mimeType = file.mimetype;
            if (extension !== ".webp" || mimeType !== "image/webp") {
                return res
                    .status(500)
                    .json({ status: 500, message: `${form} must be in WEBP Format` });
            }
        }
        next();
    });
};
exports.checkImage = checkImage;
