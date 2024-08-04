import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "@/routes/index";
import limiter from "@/utils/limiter";
import fileUpload from "express-fileupload";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(cookieParser());

app.use(limiter);
app.use(fileUpload());
app.use(express.json());
app.use("/api/v1", router);

export default app;
