import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/api.js";
import cors from "cors";

export const web = express();

// CORS configuration untuk production
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

const corsOptions = {
     origin: function (origin, callback) {
          // Allow requests with no origin (mobile apps, Postman, etc.)
          if (!origin) return callback(null, true);

          if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
               callback(null, true);
          } else {
               callback(null, true); // Untuk debugging, izinkan semua dulu
          }
     },
     credentials: true,
     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
     allowedHeaders: ['Content-Type', 'Authorization', 'X-API-TOKEN', 'Accept'],
     exposedHeaders: ['X-API-TOKEN'],
     optionsSuccessStatus: 200,
     preflightContinue: false
};

// Apply CORS
web.use(cors(corsOptions));

// Handle preflight requests explicitly
web.options('*', cors(corsOptions));

web.use(express.json());

web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware);