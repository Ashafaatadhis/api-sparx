import prisma from "@/config/prisma";
import { NextFunction, Request, Response } from "express";

import { check, matchedData, validationResult } from "express-validator";

const postValidationRules = () => {
  return [
    check("username")
      .isString()
      .trim()
      .not()
      .isEmpty()
      .escape()
      .withMessage("Username is required")
      .matches(/^[a-zA-Z0-9]+$/)
      .withMessage("Username should not contain special characters")
      .isLength({ min: 3, max: 30 })
      .withMessage("Username must be between 3 and 30 characters")
      .custom(async (value) => {
        try {
          const existingEntry = await prisma.user.findFirst({
            where: {
              username: value,
            },
          });

          if (existingEntry) {
            throw new Error("Duplicate entry found in field username");
          }
        } catch (err: any) {
          throw new Error("Duplicate entry found in field username");
        }
      }),
    check("email")
      .isString()
      .trim()
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("This field must be email"),
    check("password")
      .isString()
      .isLength({ min: 8, max: 64 })
      .escape()
      .withMessage("Password must be between 8 and 64 characters")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W]).*$/)
      .withMessage(
        "Password must consist of at least one lowercase, one uppercase, one special character, and one number"
      ),
    check("role")
      .isString()
      .not()
      .isEmpty()
      .withMessage("role is required")
      .isIn(["ADMIN", "USER"])
      .withMessage("role value is should be ADMIN or USER"),
  ];
};
const editValidationRules = () => {
  return [
    check("username")
      .isString()
      .trim()
      .not()
      .isEmpty()
      .escape()
      .withMessage("Username is required")
      .matches(/^[a-zA-Z0-9]+$/)
      .withMessage("Username should not contain special characters")
      .isLength({ min: 3, max: 30 })
      .withMessage("Username must be between 3 and 30 characters")
      .custom(async (value, { req }) => {
        try {
          const existingEntry = await prisma.user.findFirst({
            where: {
              username: value,
              NOT: { id: parseInt(req.params?.userId) },
            },
          });

          if (existingEntry) {
            throw new Error("Duplicate entry found in field username");
          }

          return true;
        } catch (err: any) {
          throw new Error("Duplicate entry found in field username");
        }
      })
      .optional(),
    check("email")
      .isString()
      .trim()
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("This field must be email")
      .optional(),
    check("password")
      .isString()
      .isLength({ min: 8, max: 64 })
      .escape()
      .withMessage("Password must be between 8 and 64 characters")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W]).*$/)
      .withMessage(
        "Password must consist of at least one lowercase, one uppercase, one special character, and one number"
      )
      .optional(),
    check("role")
      .isString()
      .not()
      .isEmpty()
      .withMessage("role is required")
      .isIn(["ADMIN", "USER"])
      .withMessage("role value is should be ADMIN or USER")
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
const checkUserIsExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ status: 500, errors: errors.array() });
  }

  req.body = matchedData(req, { onlyValidData: true });
  const { userId } = req.params;

  // Pengecekan di database
  const existingEntry = await prisma.user.findFirst({
    where: {
      id: parseInt(userId),
    },
  });

  if (!existingEntry) {
    return res.status(404).json({
      status: 404,
      message: "User not found",
    });
  }

  next();
};

export { postValidationRules, validate, editValidationRules, checkUserIsExist };
