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
exports.deleteFiles = exports.uploadSingle = void 0;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const streamifier_1 = __importDefault(require("streamifier"));
const uploadSingle = (files, folder) => __awaiter(void 0, void 0, void 0, function* () {
    // await runMiddleware(req, res, multer.single("image"));
    return new Promise((resolve, reject) => {
        if (!files) {
            return resolve(false);
        }
        const extension = files.name.split(".").reverse()[0];
        const stream = cloudinary_1.default.uploader.upload_stream({
            format: extension,
            resource_type: "raw",
            folder,
        }, (error, result) => {
            if (error)
                return console.error(error);
            return resolve({
                secure_url: result === null || result === void 0 ? void 0 : result.secure_url,
                name: files.name,
            });
        });
        streamifier_1.default.createReadStream(files.data).pipe(stream);
    });
});
exports.uploadSingle = uploadSingle;
const deleteFiles = (name) => __awaiter(void 0, void 0, void 0, function* () {
    // const fi = name.split("/").reverse().slice(0, 2).reverse().join("/").split(".");
    const arr = name.split("/");
    const fi = arr.slice(arr.length - 2).join("/");
    return yield cloudinary_1.default.uploader.destroy(fi, {
        resource_type: "raw",
    });
});
exports.deleteFiles = deleteFiles;
// export const uploadMultiple = async (req: Request, folder: string) => {
//   // await runMiddleware(req, res, multer.single("image"));
//   return new Promise((resolve, reject) => {
//     if (req?.files?.length == 0) {
//       return resolve(false);
//     }
//     if (Array.isArray(req.files)) {
//       const newAll: any[] = [];
//       req.files.forEach((file, index) => {
//         const extension = file.originalname.split(".").reverse()[0];
//         const stream = cloudinary.uploader.upload_stream(
//           {
//             format: extension,
//             resource_type: "raw",
//             folder,
//           },
//           (error, result) => {
//             if (error) return console.error(error);
//             newAll.push({
//               name: file.originalname,
//               file: result?.secure_url,
//             });
//             if (newAll.length == req.files?.length) {
//               return resolve(newAll);
//             }
//           }
//         );
//         streamifier.createReadStream(file.buffer).pipe(stream);
//       });
//     } else {
//       throw Error("Files Not Array");
//     }
//     // streamifier.createReadStream(req.file.buffer).pipe(stream);
//   });
// };
exports.default = { uploadSingle: exports.uploadSingle };
