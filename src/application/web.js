import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/api.js";
import cors from "cors";

export const web = express();
web.use(express.json());

// CORS configuration untuk production
const corsOptions = {
     origin: process.env.FRONTEND_URL || '*',
     credentials: true,
     optionsSuccessStatus: 200
};

web.use(cors(corsOptions));

web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware);