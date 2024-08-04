"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const { verify } = require("../utils/jwt");
const authentication = () => {
    return (req, res, next) => {
        var _a, _b;
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const refreshToken = (_b = req === null || req === void 0 ? void 0 : req.cookies) === null || _b === void 0 ? void 0 : _b.token;
            if (!(token && refreshToken)) {
                return res.status(401).json({ status: 401, message: "Unauthorized" });
            }
            const payload = verify(token);
            verify(refreshToken);
            req.user = payload;
        }
        catch (err) {
            return res.status(401).json({ status: 401, message: "Unauthorized" });
        }
        next();
    };
};
exports.authentication = authentication;
