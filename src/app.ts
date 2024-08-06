import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes";
import limiter from "./utils/limiter";
import fileUpload from "express-fileupload";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(cookieParser());

app.use(limiter);
app.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // 50MB
  })
);

app.use(express.json({ limit: "10mb" }));
app.use("/api/v1", router);

export default app;
