import { Request, response, Response } from "express";
import logger from "@/utils/logger";
import {
  register as registerService,
  login as loginService,
} from "@/services/authServices";
import { sign } from "@/utils/jwt";
import { responseUser } from "@/dto/user.dto";

export const register = async (req: Request, res: Response) => {
  try {
    const regist = await registerService(req.body);

    if (!regist) {
      logger.error("Register Error: username is existed");
      return res
        .status(400)
        .json({ status: 400, message: "Failed to register user" });
    }

    logger.info("Register Success: User Success Registered");

    return res.status(201).json({
      status: 201,
      message: "Successfully registered user",
      data: responseUser(regist),
    });

    // return sendResponse(res, 200, "Successfully registered new user!");
  } catch (error: any) {
    logger.error("Register Error: Failed to register user");

    return res
      .status(400)
      .json({ status: 400, message: "Failed to register user" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await loginService(req.body);

    if (!user) {
      logger.error("Login Error: Invalid username or password");
      return res
        .status(401)
        .json({ status: 401, message: "Invalid username or password" });
    }
    const token = sign(user);
    res.cookie("token", token, {
      maxAge: 3 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(200).json({
      status: 200,
      message: "Successfully logged in",
      data: {
        token,
        user: responseUser(user),
      },
    });
  } catch (err) {
    logger.error("Login Error: Failed to login");
    return res.status(400).json({ status: 400, message: "Failed to login" });
  }
};

export const logout = async (req: Request, res: Response) => {
  if (!req?.cookies?.token) {
    logger.error("Logout Error: Failed to logout");
    return res
      .status(401)
      .json({ status: 401, message: "Invalid or expired token" });
  }
  res.clearCookie("token");
  return res
    .status(200)
    .json({ status: 200, message: "Successfully logged out" });
};
