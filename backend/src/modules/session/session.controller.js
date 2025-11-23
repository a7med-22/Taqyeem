import express from "express";
import { authenticate, authorize } from "../../middleware/index.js";
import upload from "../../utils/multer/cloud.multer.js";
import * as sessionService from "./session.service.js";

const router = express.Router();

// All routes are protected
router.use(authenticate);

// General routes
router.get("/me", sessionService.getMySessions);
router.get("/:id", sessionService.getSessionById);

// Interviewer routes
router.post(
  "/:id/start",
  authorize("interviewer", "admin"),
  sessionService.startSession
);
router.post(
  "/:id/recording",
  authorize("interviewer", "admin"),
  upload.single("recording"),
  sessionService.uploadRecording
);
router.post(
  "/:id/complete",
  authorize("interviewer", "admin"),
  sessionService.completeSession
);

// General routes
router.post("/:id/cancel", sessionService.cancelSession);

export default router;
