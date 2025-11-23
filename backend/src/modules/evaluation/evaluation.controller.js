import express from "express";
import { authenticate, authorize } from "../../middleware/index.js";
import * as service from "./evaluation.service.js";

const router = express.Router();

// All routes are protected
router.use(authenticate);

// General routes
router.get("/my", service.getMyEvaluations);
router.get("/stats", authorize("admin"), service.getEvaluationStats);

// Interviewer routes
router.post("/", authorize("interviewer", "admin"), service.createEvaluation);
router.put("/:id", authorize("interviewer", "admin"), service.updateEvaluation);

// General routes
router.get("/:sessionId", service.getEvaluationBySession);

export default router;
