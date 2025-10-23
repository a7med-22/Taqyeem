import express from "express";
import {
  createEvaluation,
  getEvaluationBySession,
  getEvaluationStats,
  getMyEvaluations,
  updateEvaluation,
} from "../controllers/evaluationController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

// All routes are protected
router.use(authenticate);

// General routes
router.get("/my", getMyEvaluations);
router.get("/stats", authorize("admin"), getEvaluationStats);

// Interviewer routes
router.post("/", authorize("interviewer", "admin"), createEvaluation);
router.put("/:id", authorize("interviewer", "admin"), updateEvaluation);

// General routes
router.get("/:sessionId", getEvaluationBySession);

export default router;
