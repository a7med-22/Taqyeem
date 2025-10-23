import express from "express";
import {
  cancelSession,
  completeSession,
  getMySessions,
  getSessionById,
  startSession,
  uploadRecording,
} from "../controllers/sessionController.js";
import { authenticate, authorize } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// All routes are protected
router.use(authenticate);

// General routes
router.get("/me", getMySessions);
router.get("/:id", getSessionById);

// Interviewer routes
router.post("/:id/start", authorize("interviewer", "admin"), startSession);
router.post(
  "/:id/recording",
  authorize("interviewer", "admin"),
  upload.single("recording"),
  uploadRecording
);
router.post(
  "/:id/complete",
  authorize("interviewer", "admin"),
  completeSession
);

// General routes
router.post("/:id/cancel", cancelSession);

export default router;
