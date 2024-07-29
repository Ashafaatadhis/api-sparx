import { Request, response, Response } from "express";
import logger from "@/utils/logger";
import {
  createNewUser,
  deleteUser,
  editUser,
  getAllUser,
  getDetailUser,
} from "@/services/userServices";

import { responseUser } from "@/dto/user.dto";

export const postController = async (req: Request, res: Response) => {
  try {
    const regist = await createNewUser(req.body);

    logger.info("Add Success: Successfully created user");

    return res.status(201).json({
      status: 201,
      message: "Successfully created user",
      data: responseUser(regist),
    });
  } catch (error: any) {
    logger.error(`Add Error: ${error.message}`);

    return res
      .status(400)
      .json({ status: 400, message: "Failed to create user" });
  }
};

export const editController = async (req: Request, res: Response) => {
  try {
    const user = await editUser(
      req.body,
      parseInt(req.params?.userId as unknown as string)
    );

    logger.info("Edit Success: Successfully updated user profile");

    return res.status(201).json({
      status: 200,
      message: "Successfully updated user profile",
      data: responseUser(user),
    });
  } catch (err: any) {
    logger.error(`Edit Error: ${err.message}`);

    return res
      .status(400)
      .json({ status: 400, message: "Failed to edit user" });
  }
};

export const deleteController = async (req: Request, res: Response) => {
  try {
    await deleteUser(parseInt(req.params?.userId as unknown as string));

    logger.info("Delete Success: Successfully deleted user");

    return res.status(201).json({
      status: 200,
      message: "Successfully deleted user",
    });
  } catch (err: any) {
    logger.error(`Delete Error: ${err.message}`);

    return res
      .status(400)
      .json({ status: 400, message: "Failed to delete user" });
  }
};

export const getAllController = async (req: Request, res: Response) => {
  try {
    const result = await getAllUser();

    logger.info("Get All Success: Successfully retrieved all users");

    return res.status(201).json({
      status: 200,
      message: "Successfully retrieved all users",
      data: result.map((value) => {
        return responseUser(value);
      }),
    });
  } catch (err: any) {
    logger.error(`Get All Error: ${err.message}`);

    return res
      .status(400)
      .json({ status: 400, message: "Failed to retrieve all users" });
  }
};
export const getDetailController = async (req: Request, res: Response) => {
  try {
    const result = await getDetailUser(parseInt(req.params?.userId));

    logger.info("Get All Success: Successfully retrieved user profile");

    return res.status(201).json({
      status: 200,
      message: "Successfully retrieved user profile",
      data: responseUser(result),
    });
  } catch (err: any) {
    logger.error(`Get All Error: ${err.message}`);

    return res
      .status(400)
      .json({ status: 400, message: "Failed to retrieve user profile" });
  }
};
