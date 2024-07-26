import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "@/routes";
import limiter from "@/utils/limiter";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(cookieParser());

app.use(limiter);
app.use(express.json());
app.use("/api/v1", router);

export default app;
