import { Request, Response } from "express";
import {
  getAll as getAllGenres,
  insertData,
  editData,
  deleteData,
  getDetail,
} from "../services/songServices";
import { responseSong, responseSongWithPlaylistSong } from "../dto/song.dto";
import logger from "../utils/logger";
import { RequestCustom } from "../middlewares/authMiddleware";
import { uploadSingle } from "../utils/uploadFile";
import deleteFile from "../utils/deleteFiles";

interface QueryParams {
  page?: string;
  pageSize?: string;
}
interface Params {
  genre?: string;
  subgenre?: string;
}

export const getAllController = async (req: Request, res: Response) => {
  try {
    const { page = "1", pageSize = "10" }: QueryParams = req.query;
    const { genre, subgenre }: Params = req.params;

    const pageNumber = parseInt(page, 10);
    const pageSizeNumber = parseInt(pageSize, 10);
    const genreNumber = parseInt(genre, 10);
    const subgenreNumber = parseInt(subgenre, 10);

    const skip = (pageNumber - 1) * pageSizeNumber;
    const take = pageSizeNumber;

    const { result, count } = await getAllGenres(
      skip,
      take,
      genreNumber,
      subgenreNumber
    );
    logger.info("Get All Success: Success to Get All Genres");
    return res.status(200).json({
      status: 200,
      meta: {
        currentPage: pageNumber,
        pageSize: pageSizeNumber,
        count,
      },
      message: "Succesfully Get All Genres",
      data: result.map((value) => {
        return responseSongWithPlaylistSong(value);
      }),
    });
  } catch (err: any) {
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
      data: result ? responseSongWithPlaylistSong(result) : null,
    });
  } catch (err: any) {
    logger.error("Get Error: Failed to Get Genre");
    return res
      .status(500)
      .json({ status: 500, message: "Failed to Get Genre" });
  }
};

export const postController = async (req: RequestCustom, res: Response) => {
  try {
    // check jika filepath dan coversong bukan file multiple
    if (Array.isArray(req.files?.coverSong)) {
      logger.error(
        "Add Error: Failed to upload New song, please upload single file"
      );
      return res
        .status(500)
        .json({ status: 500, message: "Please upload single file" });
    }

    // jika coverSong ada, maka upload ke cloudinary
    if (req.files?.coverSong) {
      const coverSong = await uploadSingle(req.files.coverSong, "coverSong");
      if (!coverSong) {
        logger.error("Add Error: Failed to upload File");
        return res
          .status(500)
          .json({ status: 500, message: "Failed to upload a file" });
      }
      // proses memasukkan coverSong url ke body
      req.body.coverSong = coverSong.secure_url;
    }

    // memasukkan url lagu dan userId yang ngeupload ke body

    req.body.uploadedBy = req.user?.sub;

    const result = await insertData(req.body);
    logger.info("Add Success: Success to Add New Song");
    return res.status(201).json({
      status: 201,
      message: "Successfully Add New Song",
      data: responseSong(result),
    });
  } catch (err: any) {
    console.log(err);
    logger.error("Add Error: Failed to Add New Song");
    return res
      .status(500)
      .json({ status: 500, message: "Failed to Add New Song" });
  }
};

export const updateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const song = await getDetail(id);
    // check jika filepath dan coversong bukan file multiple
    if (Array.isArray(req.files?.coverSong)) {
      logger.error(
        "Add Error: Failed to upload New song, please upload single file"
      );
      return res
        .status(500)
        .json({ status: 500, message: "Please upload single file" });
    }

    if (!song) {
      logger.error("Edit Error: Song not found");
      return res.status(500).json({ status: 500, message: "Song not found" });
    }

    // jika file lagu ada, maka upload ke cloudinary
    // if (req.files?.filePath) {
    //   const single = await uploadSingle(req.files.filePath, "song");
    //   if (!single) {
    //     logger.error("Add Error: Failed to upload File");
    //     return res
    //       .status(500)
    //       .json({ status: 500, message: "Failed to upload a file" });
    //   }
    //   if (song.filePath) await deleteFile(song.filePath);
    //   req.body.filePath = single.secure_url;
    // }

    // jika coverSong ada, maka upload ke cloudinary
    if (req.files?.coverSong) {
      const coverSong = await uploadSingle(req.files.coverSong, "coverSong");
      if (!coverSong) {
        logger.error("Add Error: Failed to upload File");
        return res
          .status(500)
          .json({ status: 500, message: "Failed to upload a file" });
      }

      if (song.coverSong) await deleteFile(song.coverSong);
      // proses memasukkan coverSong url ke body
      req.body.coverSong = coverSong.secure_url;
    }

    const result = await editData(req.body, id);
    logger.error("Edit Success: Success to Edit This Song");
    return res.status(200).json({
      status: 200,
      message: "Successfully Edit This Song",
      data: responseSong(result),
    });
  } catch (err: any) {
    logger.error("Edit Error: Failed to Edit This Song");
    return res
      .status(500)
      .json({ status: 500, message: "Failed to Edit This Song" });
  }
};
export const deleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const song = await getDetail(id);
    if (!song) {
      logger.error("Delete Error: Song not found");
      return res.status(500).json({ status: 500, message: "Song not found" });
    }

    if (!(await deleteData(id))) {
      logger.error("Delete Error: Failed to Delete This Song");
      return res
        .status(500)
        .json({ status: 500, message: "Failed to Delete This Song" });
    }
    if (song.filePath) await deleteFile(song.filePath);
    if (song.coverSong) await deleteFile(song.coverSong);
    logger.info("Delete Success: Success to Delete This Song");
    return res.status(200).json({
      status: 200,
      message: "Successfully Delete This Song",
    });
  } catch (err: any) {
    logger.error("Delete Error: Failed to Delete This Song");
    return res
      .status(500)
      .json({ status: 500, message: "Failed to Delete This Song" });
  }
};
