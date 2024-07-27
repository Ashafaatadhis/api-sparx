import { NextFunction, Request, Response } from "express";
import { RequestCustom } from "./authMiddleware";

const roles = {
  ADMIN: ["create-genre", "read-genre", "update-genre", "delete-genre"],
  USER: ["read-genre"],
};

export default function rbacMiddleware(
  allowedRoles: string[],
  permission: string
) {
  return (req: RequestCustom, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ status: 401, message: "Unauthorized" });
    }
    const userRole = req.user.role; // Implementasi sesuai kebutuhan
    if (
      userRole &&
      allowedRoles.includes(userRole) &&
      roles[userRole].includes(permission)
    ) {
      next();
    } else {
      return res.status(401).json({ status: 401, message: "Forbidden" });
    }
  };
}

module.exports = rbacMiddleware;
