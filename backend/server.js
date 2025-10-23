import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";

// Import routes
import authRoutes from "./routes/auth.js";
import dayRoutes from "./routes/days.js";
import evaluationRoutes from "./routes/evaluations.js";
import feedbackRoutes from "./routes/feedbacks.js";
import learnRoutes from "./routes/learn.js";
import reservationRoutes from "./routes/reservations.js";
import sessionRoutes from "./routes/sessions.js";
import slotRoutes from "./routes/slots.js";
import userRoutes from "./routes/users.js";

// Import middleware
import { errorHandler } from "./middleware/error-handler.js";
import { notFound } from "./middleware/not-found.js";

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

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/taqyeem")
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Taqyeem API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/days", dayRoutes);
app.use("/api/v1/slots", slotRoutes);
app.use("/api/v1/reservations", reservationRoutes);
app.use("/api/v1/sessions", sessionRoutes);
app.use("/api/v1/evaluations", evaluationRoutes);
app.use("/api/v1/feedbacks", feedbackRoutes);
app.use("/api/v1/learn", learnRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Taqyeem API server running on port ${PORT}`);
  console.log(`📚 Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;
