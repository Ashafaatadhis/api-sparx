"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseGenre = void 0;
const responseGenre = (data) => {
    return {
        id: data.id,
        genreName: data.genreName,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt,
    };
};
exports.responseGenre = responseGenre;
