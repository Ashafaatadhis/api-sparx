import { Request, Response } from "express";
import {
  getAll as getAllGenres,
  insertData,
  editData,
  deleteData,
  getDetail,
} from "../services/subGenresServices";

import { responseSubGenre } from "../dto/subGenres.dto";
import logger from "../utils/logger";

export const getAllController = async (req: Request, res: Response) => {
  try {
    const result = await getAllGenres();
    logger.info("Get All Success: Success to Get All Sub Genres");
    return res.status(200).json({
      status: 200,
      message: "Succesfully Get All Sub Genres",
      data: result.map((value) => {
        console.log(value);
        return responseSubGenre(value);
      }),
    });
  } catch (err: any) {
    logger.error("Get All Error: Failed to Get All Sub Genres");
    return res
      .status(500)
      .json({ status: 500, message: "Failed to Get All Sub Genres" });
  }
};
export const getDetailController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await getDetail(id);
    logger.info("Get Success: Success to Get Sub Genre");
    return res.status(200).json({
      status: 200,
      message: "Succesfully Get Sub Genre",
      data: result ? responseSubGenre(result) : null,
    });
  } catch (err: any) {
    logger.info("Get Error: Failed to Get Sub Genre");
    return res
      .status(500)
      .json({ status: 500, message: "Failed to Sub Get Genre" });
  }
};

export const postController = async (req: Request, res: Response) => {
  try {
    const result = await insertData(req.body);
    logger.info("Add Success: Success to Add New Sub Genre");
    return res.status(201).json({
      status: 201,
      message: "Successfully Add New Sub Genre",
      data: responseSubGenre(result),
    });
  } catch (err: any) {
    logger.error("Add Error: Failed to Add New Sub Genre");
    return res
      .status(500)
      .json({ status: 500, message: "Failed to Add New Sub Genre" });
  }
};

export const updateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await editData(req.body, id);
    logger.error("Edit Success: Success to Edit This Sub Genre");
    return res.status(200).json({
      status: 200,
      message: "Successfully Edit This Sub Genre",
      data: responseSubGenre(result),
    });
  } catch (err: any) {
    logger.error("Edit Error: Failed to Edit This Sub Genre");
    return res
      .status(500)
      .json({ status: 500, message: "Failed to Edit This Sub Genre" });
  }
};
export const deleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!(await deleteData(id))) {
      logger.error("Delete Error: Failed to Delete This Sub Genre");
      return res
        .status(500)
        .json({ status: 500, message: "Failed to Delete This Sub Genre" });
    }
    logger.info("Delete Success: Success to Delete This Sub Genre");
    return res.status(200).json({
      status: 200,
      message: "Successfully Delete This Sub Genre",
    });
  } catch (err: any) {
    logger.error("Delete Error: Failed to Delete This Genre");
    return res
      .status(500)
      .json({ status: 500, message: "Failed to Delete This Sub Genre" });
  }
};
