"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = rbacMiddleware;
const roles = {
    ADMIN: ["create-genre", "read-genre", "update-genre", "delete-genre"],
    USER: ["read-genre"],
};
function rbacMiddleware(allowedRoles, permission) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ status: 401, message: "Unauthorized" });
        }
        const userRole = req.user.role; // Implementasi sesuai kebutuhan
        if (userRole &&
            allowedRoles.includes(userRole) &&
            roles[userRole].includes(permission)) {
            next();
        }
        else {
            return res
                .status(401)
                .json({ status: 401, message: "Unauthorized access" });
        }
    };
}
module.exports = rbacMiddleware;
