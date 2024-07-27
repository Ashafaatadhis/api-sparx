import { Request, Response } from "express";
import {
  getAll as getAllGenres,
  insertData,
  editData,
  deleteData,
  getDetail,
} from "@/services/genresServices";
import { responseGenre } from "@/dto/genres.dto";

export const getAllController = async (req: Request, res: Response) => {
  try {
    const result = await getAllGenres();
    return res.status(200).json({
      status: 200,
      message: "Succesfully Get All Genres",
      data: result.map((value) => {
        return responseGenre(value);
      }),
    });
  } catch (err: any) {
    console.log(err);
    return res
      .status(500)
      .json({ status: 500, message: "Failed to Get All Genres" });
  }
};
export const getDetailController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await getDetail(id);
    return res.status(200).json({
      status: 200,
      message: "Succesfully Get Genre",
      data: result ? responseGenre(result) : null,
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ status: 500, message: "Failed to Get Genre" });
  }
};

export const postController = async (req: Request, res: Response) => {
  try {
    const result = await insertData(req.body);
    return res.status(200).json({
      status: 200,
      message: "Successfully Add New Genre",
      data: responseGenre(result),
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ status: 500, message: "Failed to Add New Genre" });
  }
};

export const updateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await editData(req.body, id);
    return res.status(200).json({
      status: 200,
      message: "Successfully Edit This Genre",
      data: responseGenre(result),
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ status: 500, message: "Failed to Edit This Genre" });
  }
};
export const deleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteData(id);

    return res.status(200).json({
      status: 200,
      message: "Successfully Delete This Genre",
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ status: 500, message: "Failed to Delete This Genre" });
  }
};
