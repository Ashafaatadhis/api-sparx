import { Request, Response } from "express";
import {
  getAll as getAllGenres,
  insertData,
  editData,
  deleteData,
  getDetail,
} from "../services/genresServices";
import { responseGenre } from "../dto/genres.dto";
import logger from "../utils/logger";

export const getAllController = async (req: Request, res: Response) => {
  try {
    const result = await getAllGenres();
    logger.info("Get All Success: Success to Get All Genres");
    return res.status(200).json({
      status: 200,
      message: "Succesfully Get All Genres",
      data: result.map((value) => {
        return responseGenre(value);
      }),
    });
  } catch (err: any) {
    console.log(err);
    logger.error("Get All Error: Failed to Get All Genres");
    return res
      .status(500)
      .json({ status: 500, message: "Failed to Get All Genres" });
  }
};
export const getDetailController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await getDetail(id);
    logger.info("Get Success: Success to Get Genre");
    return res.status(200).json({
      status: 200,
      message: "Succesfully Get Genre",
      data: result ? responseGenre(result) : null,
    });
  } catch (err: any) {
    logger.error("Get Error: Failed to Get Genre");
    return res
      .status(500)
      .json({ status: 500, message: "Failed to Get Genre" });
  }
};

export const postController = async (req: Request, res: Response) => {
  try {
    const result = await insertData(req.body);
    logger.info("Add Success: Success to Add New Genre");
    return res.status(201).json({
      status: 201,
      message: "Successfully Add New Genre",
      data: responseGenre(result),
    });
  } catch (err: any) {
    logger.error("Add Error: Failed to Add New Genre");
    return res
      .status(500)
      .json({ status: 500, message: "Failed to Add New Genre" });
  }
};

export const updateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await editData(req.body, id);
    logger.error("Edit Success: Success to Edit This Genre");
    return res.status(200).json({
      status: 200,
      message: "Successfully Edit This Genre",
      data: responseGenre(result),
    });
  } catch (err: any) {
    logger.error("Edit Error: Failed to Edit This Genre");
    return res
      .status(500)
      .json({ status: 500, message: "Failed to Edit This Genre" });
  }
};
export const deleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!(await deleteData(id))) {
      logger.error("Delete Error: Failed to Delete This Genre");
      return res
        .status(500)
        .json({ status: 500, message: "Failed to Delete This Genre" });
    }
    logger.info("Delete Success: Success to Delete This Genre");
    return res.status(200).json({
      status: 200,
      message: "Successfully Delete This Genre",
    });
  } catch (err: any) {
    logger.error("Delete Error: Failed to Delete This Genre");
    return res
      .status(500)
      .json({ status: 500, message: "Failed to Delete This Genre" });
  }
};
