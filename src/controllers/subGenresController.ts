import { Request, Response } from "express";
import {
  getAll as getAllGenres,
  insertData,
  editData,
  deleteData,
  getDetail,
} from "@/services/subGenresServices";

import { responseSubGenre } from "@/dto/subGenres.dto";

export const getAllController = async (req: Request, res: Response) => {
  try {
    const result = await getAllGenres();

    return res.status(200).json({
      status: 200,
      message: "Succesfully Get All Sub Genres",
      data: result.map((value) => {
        console.log(value);
        return responseSubGenre(value);
      }),
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ status: 500, message: "Failed to Get Sub All Genres" });
  }
};
export const getDetailController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await getDetail(id);
    return res.status(200).json({
      status: 200,
      message: "Succesfully Get Sub Genre",
      data: result ? responseSubGenre(result) : null,
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ status: 500, message: "Failed to Sub Get Genre" });
  }
};

export const postController = async (req: Request, res: Response) => {
  try {
    const result = await insertData(req.body);

    return res.status(200).json({
      status: 200,
      message: "Successfully Add New Sub Genre",
      data: responseSubGenre(result),
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ status: 500, message: "Failed to Add New Sub Genre" });
  }
};

export const updateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await editData(req.body, id);
    return res.status(200).json({
      status: 200,
      message: "Successfully Edit This Sub Genre",
      data: responseSubGenre(result),
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ status: 500, message: "Failed to Edit This Sub Genre" });
  }
};
export const deleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!(await deleteData(id))) {
      return res
        .status(500)
        .json({ status: 500, message: "Failed to Delete This Sub Genre" });
    }

    return res.status(200).json({
      status: 200,
      message: "Successfully Delete This Sub Genre",
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ status: 500, message: "Failed to Delete This Sub Genre" });
  }
};
