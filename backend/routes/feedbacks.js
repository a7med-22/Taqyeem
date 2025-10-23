import express from "express";
import {
  createFeedback,
  deleteFeedback,
  getFeedbacksBySession,
  getMyFeedbacks,
  getPublicFeedbacks,
  updateFeedback,
} from "../controllers/feedbackController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/public", getPublicFeedbacks);

// Protected routes
router.use(authenticate);

// General routes
router.post("/", createFeedback);
router.get("/my", getMyFeedbacks);
router.put("/:id", updateFeedback);
router.delete("/:id", deleteFeedback);

// General routes
router.get("/:sessionId", getFeedbacksBySession);

export default router;
