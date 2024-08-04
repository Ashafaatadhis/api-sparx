"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseSubGenre = void 0;
const responseSubGenre = (data) => {
    var _a;
    return {
        id: data.id,
        subGenreName: data.subGenreName,
        genreName: (_a = data.Genre) === null || _a === void 0 ? void 0 : _a.genreName,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt,
    };
};
exports.responseSubGenre = responseSubGenre;
