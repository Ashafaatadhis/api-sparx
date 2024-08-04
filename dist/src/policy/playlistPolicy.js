"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (user, playlist) => {
    if (user.role === "ADMIN") {
        return true;
    }
    if (playlist.createdBy === user.sub) {
        return true;
    }
    return false;
};
