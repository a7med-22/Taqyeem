import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

// Import database connection
import connectDB from "./config/database.js";

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
const allowedOrigins = [
  "https://taqyeem.vercel.app",
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean); // Remove any undefined values

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Connect to MongoDB
connectDB();

// Welcome endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🌟 Welcome to Taqyeem API! 🌟",
    description: "Bilingual Interview & Learning Platform",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      auth: "/api/v1/auth",
      users: "/api/v1/users",
      days: "/api/v1/days",
      slots: "/api/v1/slots",
      reservations: "/api/v1/reservations",
      sessions: "/api/v1/sessions",
      evaluations: "/api/v1/evaluations",
      feedbacks: "/api/v1/feedbacks",
      learn: "/api/v1/learn",
    },
    documentation: "Visit /health for API status",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
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
