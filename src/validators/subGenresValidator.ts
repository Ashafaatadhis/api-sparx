import prisma from "../config/prisma";
import { NextFunction, Request, Response } from "express";
import { check, matchedData, validationResult } from "express-validator";

const postValidationRules = () => {
  return [
    check("subGenreName")
      .isString()
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage("subGenreName is required"),
    check("genreId")
      .isNumeric()
      .withMessage("genreId Should Numeric")
      .not()
      .isEmpty()
      .withMessage("genreId is required")
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
  ];
};

const editValidationRules = () => {
  return [
    check("subGenreName")
      .isString()
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage("subGenreName is required"),
    check("genreId")
      .isNumeric()
      .withMessage("genreId Should Numeric")
      .not()
      .isEmpty()
      .withMessage("genreId is required")
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
