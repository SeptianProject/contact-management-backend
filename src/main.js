import { web } from "./application/web.js";
import { logger } from "./application/logging.js";

// Untuk development
if (process.env.NODE_ENV !== 'production') {
    web.listen(3000, () => {
        logger.info("App start on port 3000");
    });
}

// Export untuk Vercel serverless
export default web;