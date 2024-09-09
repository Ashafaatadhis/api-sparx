import { Request, Response } from "express";
import {
  getAll,
  getAllSong,
  getDetail,
} from "../services/publicPlaylistService";

import {
  responsePublicPlaylist,
  responsePublicPlaylistSong,
} from "../dto/publicPlaylist.dto";
import logger from "../utils/logger";

interface QueryParams {
  page?: string;
  pageSize?: string;
  link?: string;
}
interface Params {
  genre?: string;
  subgenre?: string;
}

export const getAllController = async (req: Request, res: Response) => {
  try {
    const result = await getAll();
    logger.info("Get All Success: Successfully retrieved public playlists");
    return res.status(200).json({
      status: 200,
      message: "Successfully retrieved public playlists",
      data: result.map((value) => {
        return responsePublicPlaylist(value);
      }),
    });
  } catch (err: any) {
    logger.error("Get All Error: Failed to retrieve public playlists");
    return res
      .status(500)
      .json({ status: 500, message: "Failed to retrieve public playlists" });
  }
};
export const getDetailController = async (req: Request, res: Response) => {
  try {
    const { link } = req.params;

    const result = await getDetail(link);
    logger.info("Get Success: Successfully retrieved public playlist");
    return res.status(200).json({
      status: 200,
      message: "Successfully retrieved public playlist",
      data: result ? responsePublicPlaylist(result) : null,
    });
  } catch (err: any) {
    logger.info("Get Error: Failed to retrieve public playlist");
    return res
      .status(500)
      .json({ status: 500, message: "Failed to retrieve public playlist" });
  }
};
export const getAllSongController = async (req: Request, res: Response) => {
  try {
    const { page = "1", pageSize = "10" }: QueryParams = req.query;
    const { genre, subgenre }: Params = req.params;

    const pageNumber = parseInt(page, 10);
    const pageSizeNumber = parseInt(pageSize, 10);
    const genreNumber = parseInt(genre, 10);
    const subgenreNumber = parseInt(subgenre, 10);

    const skip = (pageNumber - 1) * pageSizeNumber;
    const take = pageSizeNumber;

    const { link } = req.params;
    const { count, result } = await getAllSong(
      link,
      skip,
      take,
      genreNumber,
      subgenreNumber
    );
    logger.info("Get Success: Successfully retrieved songs in the playlist");
    return res.status(200).json({
      status: 200,
      message: "Successfully retrieved songs in the playlist",
      meta: {
        currentPage: pageNumber,
        pageSize: pageSizeNumber,
        count,
      },
      data: result.map((v) => {
        return responsePublicPlaylistSong(v);
      }),
    });
  } catch (err: any) {
    logger.info("Get Error: Failed to retrieve songs in the playlist");
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve songs in the playlist",
    });
  }
};
