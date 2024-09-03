import prisma from "../config/prisma";
import { NextFunction, Request, Response } from "express";
import { check, matchedData, validationResult } from "express-validator";

const postValidationRules = () => {
  return [
    check("title")
      .isString()
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage("Title is required"),
    check("filePath")
      .isString()
      .not()
      .isEmpty()
      .withMessage("filePath is required"),
    check("tempo").isString().not().isEmpty().withMessage("tempo is required"),
    check("vocal")
      .not()
      .isEmpty()
      .withMessage("vocal is required")
      .isBoolean()
      .withMessage("vocal  boolean")
      .toBoolean(),
    check("singer")
      .isString()
      .trim()
      .escape()
      // .not()
      // .isEmpty()
      // .withMessage("Singer is required")
      .optional(),
    check("duration")
      .isNumeric()
      .withMessage("duration Should Numeric")
      .not()
      .isEmpty()
      .withMessage("duration is required")
      .toInt(),
    check("bpm")
      .isNumeric()
      .withMessage("bpm Should Numeric")
      .not()
      .isEmpty()
      .withMessage("bpm is required")
      .toInt(),
    check("genreId")
      .isNumeric()
      .withMessage("genreId Should Numeric")
      .not()
      .isEmpty()
      .withMessage("genreId is required")
      .toInt()
      .custom(async (value) => {
        try {
          const result = await prisma.genre.findFirst({
            where: {
              id: parseInt(value),
            },
          });
          if (!result) throw new Error("Genre Not Found");
          return true;
        } catch (err) {
          throw new Error("Genre Not Found");
        }
      }),
    check("subGenreId")
      .isNumeric()
      .withMessage("subGenreId Should Numeric")
      .not()
      .isEmpty()
      .withMessage("subGenreId is required")
      .toInt()
      .custom(async (value) => {
        try {
          const result = await prisma.subGenre.findFirst({
            where: {
              id: parseInt(value),
            },
          });
          if (!result) throw new Error("Sub Genre Not Found");
          return true;
        } catch (err) {
          throw new Error("Sub Genre Not Found");
        }
      })
      .optional(),
  ];
};

const editValidationRules = () => {
  return [
    check("title")
      .isString()
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage("Title is required"),
    check("filePath")
      .isString()
      .not()
      .isEmpty()
      .withMessage("filePath is required"),
    check("tempo").isString().not().isEmpty().withMessage("tempo is required"),
    check("duration")
      .isNumeric()
      .withMessage("duration Should Numeric")
      .not()
      .isEmpty()
      .withMessage("duration is required")
      .optional()
      .toInt(),
    check("bpm")
      .isNumeric()
      .withMessage("bpm Should Numeric")
      .not()
      .isEmpty()
      .withMessage("bpm is required")
      .optional()
      .toInt(),
    check("vocal")
      .not()
      .isEmpty()
      .withMessage("vocal is required")
      .isBoolean()
      .withMessage("vocal  boolean")
      .toBoolean(),
    check("singer")
      .isString()
      .trim()
      .escape()
      // .not()
      // .isEmpty()
      // .withMessage("Singer is required")
      .optional(),
    check("genreId")
      .isNumeric()
      .withMessage("genreId Should Numeric")
      .not()
      .isEmpty()
      .withMessage("genreId is required")
      .toInt()
      .custom(async (value) => {
        try {
          const result = await prisma.genre.findFirst({
            where: {
              id: parseInt(value),
            },
          });
          if (!result) throw new Error("Genre Not Found");
          return true;
        } catch (err) {
          throw new Error("Genre Not Found");
        }
      }),
    check("subGenreId")
      .isNumeric()
      .withMessage("subGenreId Should Numeric")
      .not()
      .isEmpty()
      .withMessage("subGenreId is required")
      .toInt()
      .custom(async (value) => {
        try {
          const result = await prisma.subGenre.findFirst({
            where: {
              id: parseInt(value),
            },
          });
          if (!result) throw new Error("Sub Genre Not Found");
          return true;
        } catch (err) {
          throw new Error("Sub Genre Not Found");
        }
      })
      .optional(),
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

export { editValidationRules, postValidationRules, validate };
