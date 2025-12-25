import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/api.js";
import cors from "cors";

export const web = express();

// CORS configuration untuk production
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            'https://svelte-contact-management-iota.vercel.app',
            'http://localhost:5173',
            'http://localhost:3000',
            'http://localhost:4173'
        ];
        
        // Jika FRONTEND_URL di-set, tambahkan ke allowed origins
        if (process.env.FRONTEND_URL) {
            allowedOrigins.push(process.env.FRONTEND_URL);
        }
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-TOKEN'],
    optionsSuccessStatus: 200
};

web.use(cors(corsOptions));
web.use(express.json());

web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware);