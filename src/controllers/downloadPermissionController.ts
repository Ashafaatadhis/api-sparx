import { Request, Response } from "express";

import {
  insertData,
  getAll,
  getDetail,
  editData,
  deleteData,
} from "@/services/downloadPermissionService";

import logger from "@/utils/logger";
import { responseDownloadPermission } from "@/dto/downloadPermission.dto";

export const getAllController = async (req: Request, res: Response) => {
  try {
    const result = await getAll();
    logger.info("Get All Success: Successfully retrieved download permissions");
    return res.status(200).json({
      status: 200,
      message: "Successfully retrieved download permissions",
      data: result.map((value) => {
        return responseDownloadPermission(value);
      }),
    });
  } catch (err: any) {
    logger.error("Get All Error: Failed to retrieve download permissions");
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve download permissions",
    });
  }
};
export const getDetailController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await getDetail(id);
    logger.info("Get Success: Successfully retrieved download permission");
    return res.status(200).json({
      status: 200,
      message: "Successfully retrieved download permission",
      data: result ? responseDownloadPermission(result) : null,
    });
  } catch (err: any) {
    logger.error("Get Error: Failed to retrieve download permissions");
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve download permissions",
    });
  }
};

export const postController = async (req: Request, res: Response) => {
  try {
    const result = await insertData(req.body);
    logger.info("Add Success: Successfully created download permission");
    return res.status(201).json({
      status: 201,
      message: "Successfully created download permission",
      data: responseDownloadPermission(result),
    });
  } catch (err: any) {
    logger.error("Add Error: Failed to create download permission");
    return res
      .status(500)
      .json({ status: 500, message: "Failed to create download permission" });
  }
};

export const updateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await editData(req.body, id);
    logger.info("Edit Success: Successfully updated download permission");
    return res.status(200).json({
      status: 200,
      message: "Successfully updated download permission",
      data: responseDownloadPermission(result),
    });
  } catch (err: any) {
    console.log(err);
    logger.error("Edit Error: Failed to update download permission");
    return res
      .status(500)
      .json({ status: 500, message: "Failed to update download permission" });
  }
};
export const deleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!(await deleteData(id))) {
      logger.error("Delete Error: Failed to delete download permission");
      return res
        .status(500)
        .json({ status: 500, message: "Failed to delete download permission" });
    }
    logger.info("Delete Success: Successfully deleted download permission");
    return res.status(200).json({
      status: 200,
      message: "Successfully deleted download permission",
    });
  } catch (err: any) {
    logger.error("Delete Error: Failed to delete download permission");
    return res
      .status(500)
      .json({ status: 500, message: "Failed to delete download permission" });
  }
};
