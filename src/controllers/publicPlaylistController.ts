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
    const { id } = req.params;
    const result = await getDetail(id);
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
    const { id } = req.params;
    const result = await getAllSong(id);
    logger.info("Get Success: Successfully retrieved songs in the playlist");
    return res.status(200).json({
      status: 200,
      message: "Successfully retrieved songs in the playlist",
      data: result ? responsePublicPlaylistSong(result) : null,
    });
  } catch (err: any) {
    logger.info("Get Error: Failed to retrieve songs in the playlist");
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve songs in the playlist",
    });
  }
};
