import prisma from "@/config/prisma";
import { NextFunction, Request, Response } from "express";

import { check, matchedData, validationResult } from "express-validator";

const postValidationRules = () => {
  return [
    check("userId")
      .isNumeric()
      .withMessage("userId Should Numeric")
      .not()
      .isEmpty()
      .withMessage("userId is required")
      .toInt()
      .custom(async (value) => {
        try {
          const result = await prisma.user.findFirst({
            where: {
              id: parseInt(value),
            },
          });
          if (!result) throw new Error("User Not Found");
          return true;
        } catch (err) {
          throw new Error("User Not Found");
        }
      }),
    check("songId")
      .isNumeric()
      .withMessage("songId Should Numeric")
      .not()
      .isEmpty()
      .withMessage("songId is required")
      .toInt()
      .custom(async (value) => {
        try {
          const result = await prisma.song.findFirst({
            where: {
              id: parseInt(value),
            },
          });
          if (!result) throw new Error("Song Not Found");
          return true;
        } catch (err) {
          throw new Error("Song Not Found");
        }
      })
      .optional(),
    check("playlistId")
      .isNumeric()
      .withMessage("playlistId Should Numeric")
      .not()
      .isEmpty()
      .withMessage("playlistId is required")
      .toInt()
      .custom(async (value) => {
        try {
          const result = await prisma.playlist.findFirst({
            where: {
              id: parseInt(value),
            },
          });
          if (!result) throw new Error("Playlist Not Found");
          return true;
        } catch (err) {
          throw new Error("Playlist Not Found");
        }
      })
      .optional(),
    check("format")
      .isString()
      .not()
      .isEmpty()
      .withMessage("format is required")
      .isIn(["mp3", "wav"])
      .withMessage("The value of format should be mp3 or wav"),
  ];
};

const editValidationRules = () => {
  return [
    check("userId")
      .isNumeric()
      .withMessage("userId Should Numeric")
      .not()
      .isEmpty()
      .withMessage("userId is required")
      .toInt()
      .custom(async (value) => {
        try {
          const result = await prisma.user.findFirst({
            where: {
              id: parseInt(value),
            },
          });
          if (!result) throw new Error("User Not Found");
          return true;
        } catch (err) {
          throw new Error("User Not Found");
        }
      }),
    check("songId")
      .isNumeric()
      .withMessage("songId Should Numeric")
      .not()
      .isEmpty()
      .withMessage("songId is required")
      .toInt()
      .custom(async (value) => {
        try {
          const result = await prisma.song.findFirst({
            where: {
              id: parseInt(value),
            },
          });
          if (!result) throw new Error("Song Not Found");
          return true;
        } catch (err) {
          throw new Error("Song Not Found");
        }
      })
      .optional(),
    check("playlistId")
      .isNumeric()
      .withMessage("playlistId Should Numeric")
      .not()
      .isEmpty()
      .withMessage("playlistId is required")
      .toInt()
      .custom(async (value) => {
        try {
          const result = await prisma.playlist.findFirst({
            where: {
              id: parseInt(value),
            },
          });
          if (!result) throw new Error("Playlist Not Found");
          return true;
        } catch (err) {
          throw new Error("Playlist Not Found");
        }
      })
      .optional(),
    check("format")
      .isString()
      .not()
      .isEmpty()
      .withMessage("format is required")
      .isIn(["mp3", "wav"])
      .withMessage("The value of format should be mp3 or wav"),
  ];
};

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ status: 500, errors: errors.array() });
  }

  req.body = matchedData(req, { onlyValidData: true });
  next();
};

const checkDuplicateEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ status: 500, errors: errors.array() });
  }
  req.body = matchedData(req, { onlyValidData: true });
  const { userId, playlistId, songId } = req.body;

  // Pengecekan di database
  const existingEntry = await prisma.downloadPermission.findFirst({
    where: {
      userId: userId,
      songId: songId || null,
      playlistId: playlistId || null,
    },
  });

  if (existingEntry) {
    return res.status(500).json({
      status: 500,
      errors: [
        { msg: "Duplicate entry in field userId, playlistId and songId" },
      ],
    });
  }

  next();
};
const checkDuplicateEntryOnUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ status: 500, errors: errors.array() });
  }
  req.body = matchedData(req, { onlyValidData: true });
  const { id } = req.params;
  const { userId, playlistId, songId } = req.body;

  const isExist = await prisma.downloadPermission.findFirst({
    where: {
      id: parseInt(id),
    },
  });
  if (!isExist) {
    return res.status(500).json({
      status: 500,
      message: "Download Permission not found",
    });
  }

  next();
};

export {
  editValidationRules,
  postValidationRules,
  validate,
  checkDuplicateEntry,
  checkDuplicateEntryOnUpdate,
};
