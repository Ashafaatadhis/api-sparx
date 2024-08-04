import { Request, Response } from "express";
import {
  getAllByUserId,
  insertData,
  editData,
  deleteData,
  getDetailByUserId,
  insertDataSongToPlaylist,
  getDataSongInPlaylist,
  deleteSongInPlaylist,
} from "../services/playlistServices";

import { responsePlaylist, responsePlaylistSong } from "../dto/playlist.dto";
import logger from "../utils/logger";
import { RequestCustom } from "../middlewares/authMiddleware";

import playlistPolicy from "../policy/playlistPolicy";

export const getAllController = async (req: RequestCustom, res: Response) => {
  try {
    if (!req?.user) {
      logger.error("Get All Error: User not Found");
      return res
        .status(500)
        .json({ status: 500, message: "Failed to retrieve playlists" });
    }

    const result = await getAllByUserId(req.user.sub);
    logger.info("Get All Success: Successfully retrieved playlists");
    return res.status(200).json({
      status: 200,
      message: "Successfully retrieved playlists",
      data: result.map((value) => {
        return responsePlaylist(value);
      }),
    });
  } catch (err: any) {
    logger.error("Get All Error: Failed to retrieve playlists");
    return res
      .status(500)
      .json({ status: 500, message: "Failed to retrieve playlists" });
  }
};
export const getDetailController = async (
  req: RequestCustom,
  res: Response
) => {
  try {
    const { id } = req.params;
    if (!req?.user) {
      logger.error("Get Error: User not Found");
      return res
        .status(500)
        .json({ status: 500, message: "Failed to retrieve playlist" });
    }
    const result = await getDetailByUserId(id, req.user.sub);
    logger.info("Get Success: Successfully retrieved playlist");
    return res.status(200).json({
      status: 200,
      message: "Succesfully retrieved playlist",
      data: result ? responsePlaylist(result) : null,
    });
  } catch (err: any) {
    logger.error("Get Error: Failed to retrieve playlist");
    return res
      .status(500)
      .json({ status: 500, message: "Failed to retrieve playlist" });
  }
};

export const postController = async (req: RequestCustom, res: Response) => {
  try {
    if (!req?.user) {
      logger.error("Add Error: User not Found");
      return res
        .status(500)
        .json({ status: 500, message: "Failed to retrieve playlist" });
    }
    req.body.createdBy = req.user.sub;
    const result = await insertData(req.body);
    logger.info("Add Success: Successfully created playlist");
    return res.status(201).json({
      status: 201,
      message: "Successfully created playlist",
      data: responsePlaylist(result),
    });
  } catch (err: any) {
    console.log(err);
    logger.error("Add Error: Failed to create playlist");
    return res
      .status(500)
      .json({ status: 500, message: "Failed to create playlist" });
  }
};

export const updateController = async (req: RequestCustom, res: Response) => {
  try {
    const { id } = req.params;
    if (!req?.user) {
      logger.error("Edit Error: User not Found");
      return res
        .status(500)
        .json({ status: 500, message: "Failed to update playlist" });
    }

    const getPlaylist = await getDetailByUserId(id, req.user.sub);
    if (!getPlaylist) {
      logger.error("Edit Error: Playlist not found");
      return res
        .status(500)
        .json({ status: 500, message: "Failed to update playlist" });
    }

    // jika update punya orang lain
    if (!playlistPolicy(req.user, getPlaylist)) {
      logger.error("Edit Error: Forbidden");
      return res
        .status(401)
        .json({ status: 401, message: "Forbidden to update" });
    }

    const result = await editData(req.body, id);
    logger.error("Edit Success: Successfully updated playlist");
    return res.status(200).json({
      status: 200,
      message: "Successfully Edit This Song",
      data: responsePlaylist(result),
    });
  } catch (err: any) {
    console.log(err);
    logger.error("Edit Error: Failed to update playlist");
    return res
      .status(500)
      .json({ status: 500, message: "Failed to update playlist" });
  }
};
export const deleteController = async (req: RequestCustom, res: Response) => {
  try {
    const { id } = req.params;
    if (!req?.user) {
      logger.error("Delete Error: User not Found");
      return res
        .status(500)
        .json({ status: 500, message: "Failed to delete playlist" });
    }

    const getPlaylist = await getDetailByUserId(id, req.user.sub);
    if (!getPlaylist) {
      logger.error("Delete Error: Playlist not found");
      return res
        .status(500)
        .json({ status: 500, message: "Failed to delete playlist" });
    }

    // jika delete punya orang lain
    if (!playlistPolicy(req.user, getPlaylist)) {
      logger.error("Delete Error: Forbidden");
      return res
        .status(401)
        .json({ status: 401, message: "Forbidden to delete" });
    }

    if (!(await deleteData(id))) {
      logger.error("Delete Error: Failed to delete playlist");
      return res
        .status(500)
        .json({ status: 500, message: "Failed to delete playlist" });
    }

    logger.info("Delete Success: Successfully deleted playlist");
    return res.status(200).json({
      status: 200,
      message: "Successfully deleted playlist",
    });
  } catch (err: any) {
    logger.error("Delete Error: Failed to delete playlist");
    return res
      .status(500)
      .json({ status: 500, message: "Failed to delete playlist" });
  }
};

// ADD SONG TO PLAYLIST

export const postPlaylistController = async (
  req: RequestCustom,
  res: Response
) => {
  try {
    const { id } = req.params;
    if (!req?.user) {
      logger.error("Add Error: User not Found");
      return res
        .status(500)
        .json({ status: 500, message: "Failed to add song to playlist" });
    }

    const playlist = await getDetailByUserId(id, req.user.sub);
    if (!playlist) {
      logger.error("Delete Error: Failed to add song to playlist");
      return res
        .status(500)
        .json({ status: 500, message: "Failed to add song to playlist" });
    }
    req.body.playlistId = playlist.id;
    const result = await insertDataSongToPlaylist(req.body);
    logger.info("Add Success: Successfully added song to playlist");
    return res.status(200).json({
      status: 200,
      message: "Successfully added song to playlist",
      data: responsePlaylistSong(result),
    });
  } catch (err: any) {
    console.log(err);
    logger.error("Delete Error: Failed to add song to playlist");
    return res
      .status(500)
      .json({ status: 500, message: "Failed to add song to playlist" });
  }
};

export const deletPlaylistSongController = async (
  req: RequestCustom,
  res: Response
) => {
  try {
    const { id, songId } = req.params;
    if (!req?.user) {
      logger.error("Add Error: User not Found");
      return res
        .status(500)
        .json({ status: 500, message: "Failed to remove song from playlist" });
    }

    const getPlaylist = await getDetailByUserId(id, req.user.sub);
    if (!getPlaylist) {
      logger.error("Delete Error: Playlist not found");
      return res
        .status(500)
        .json({ status: 500, message: "Failed to remove song from playlist" });
    }

    const getSongInPlaylist = await getDataSongInPlaylist(
      getPlaylist.id,
      parseInt(songId)
    );

    if (!getSongInPlaylist) {
      logger.error("Delete Error: Song in playlist not found");
      return res
        .status(500)
        .json({ status: 500, message: "Failed to remove song from playlist" });
    }

    // jika delete punya orang lain
    if (!playlistPolicy(req.user, getPlaylist)) {
      logger.error("Delete Error: Forbidden");
      return res
        .status(401)
        .json({ status: 401, message: "Forbidden to delete" });
    }

    if (!(await deleteSongInPlaylist(getPlaylist.id, parseInt(songId)))) {
      logger.error("Delete Error: Failed to remove song from playlist");
      return res
        .status(500)
        .json({ status: 500, message: "Failed to remove song from playlist" });
    }

    logger.info("Delete Success: Successfully removed song from playlist");
    return res.status(200).json({
      status: 200,
      message: "Successfully removed song from playlist",
    });
  } catch (err: any) {
    logger.error("Delete Error: Failed to remove song from playlist");
    return res
      .status(500)
      .json({ status: 500, message: "Failed to remove song from playlist" });
  }
};
