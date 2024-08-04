"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseUser = void 0;
const responseUser = (data) => {
    return {
        id: data.id,
        email: data.email,
        role: data.role,
        username: data.username,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt,
    };
};
exports.responseUser = responseUser;
