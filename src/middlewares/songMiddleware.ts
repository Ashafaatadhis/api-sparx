import { NextFunction, Request, Response } from "express";
import * as mm from "music-metadata";

import sharp from "sharp";
import path from "path";

export const checkAudio = (form: string, type: "POST" | "EDIT") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const file: any = req.files && req.files[form];

    if (type === "POST") {
      if (!file) {
        return res
          .status(500)
          .json({ status: 500, message: `${form} is Requirements` });
      }
    } else {
      next();
      return;
    }

    const extension = path.extname(file.name).toLowerCase();
    const mimeType = file.mimetype;

    if (
      ![".mp3", ".wav"].includes(extension) ||
      !["audio/mpeg", "audio/wave"].includes(mimeType)
    ) {
      return res
        .status(500)
        .json({ status: 500, message: `${form} must be in MP3 or WAV Format` });
    }

    const metadata = await mm.parseBuffer(file.data, "audio/mpeg");
    req.body.duration = metadata.format?.duration
      ? metadata.format.duration
      : 0;

    next();
  };
};

export const checkImage = (form: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const file: any = req.files && req.files[form];

    if (file) {
      const extension = path.extname(file.name).toLowerCase();
      const mimeType = file.mimetype;

      if (extension !== ".webp" || mimeType !== "image/webp") {
        return res
          .status(500)
          .json({ status: 500, message: `${form} must be in WEBP Format` });
      }
    }
    next();
  };
};
