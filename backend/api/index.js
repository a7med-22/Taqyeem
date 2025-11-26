// Vercel serverless function entry point
import app from "../index.js";
import connectDB from "../src/DB/connection.js";

// Connect to database when function is invoked
// Connection is cached for subsequent invocations
connectDB().catch((error) => {
  console.error("Failed to connect to database:", error);
});

export default app;
