import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

// Import database connection
import connectDB from "./src/DB/connection.js";

// Import app controller (all routes)
import appController from "./src/app.controller.js";

// Import error handlers
import { notFound } from "./src/middleware/index.js";
import { globalErrorHandling } from "./src/utils/response.js";

// Load environment variables
dotenv.config();

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
  },
});
app.use("/api/", limiter);

app.use(cors());

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Connect to MongoDB
connectDB();

// Use app controller for all routes
app.use("/", appController);

// Error handling middleware
app.use(notFound);

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, () => {
  console.log(`🚀 Taqyeem API server running`);
  console.log(`🌐 URL: http://${HOST}:${PORT}`);
  console.log(`📚 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`⚡ Ready to accept requests!`);
});

export default app;

app.use(globalErrorHandling);
