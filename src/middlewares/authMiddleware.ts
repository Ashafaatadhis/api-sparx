import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import type { IPayload } from "../utils/jwt";

const { verify } = require("../utils/jwt");

export interface RequestCustom extends Request {
  user?: IPayload;
}

export const authentication = () => {
  return (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const refreshToken = req?.cookies?.token;

      if (!(token && refreshToken)) {
        return res.status(401).json({ status: 401, message: "Unauthorized" });
      }

      const payload = verify(token);
      verify(refreshToken);
      req.user = payload;
    } catch (err: any) {
      return res.status(401).json({ status: 401, message: "Unauthorized" });
    }

    next();
  };
};
