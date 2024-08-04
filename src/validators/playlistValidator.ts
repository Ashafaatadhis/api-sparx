import prisma from "@/config/prisma";
import { NextFunction, Request, Response } from "express";
import { check, matchedData, validationResult } from "express-validator";

const postValidationRules = () => {
  return [
    check("playlistName")
      .isString()
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage("playlistName is required"),
    check("isPublic")
      .not()
      .isEmpty()
      .withMessage("isPublic is required")
      .isBoolean()
      .withMessage("isPublic should boolean")
      .toBoolean(),
  ];
};
const postSongToPlaylistValidationRules = () => {
  return [
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
      }),
  ];
};

const editValidationRules = () => {
  return [
    check("playlistName")
      .isString()
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage("playlistName is required"),
    check("isPublic")
      .not()
      .isEmpty()
      .withMessage("isPublic is required")
      .isBoolean()
      .withMessage("isPublic should boolean")
      .toBoolean(),
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

export {
  editValidationRules,
  postValidationRules,
  validate,
  postSongToPlaylistValidationRules,
};
