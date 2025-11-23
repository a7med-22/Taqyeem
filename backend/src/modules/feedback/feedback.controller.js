import express from "express";
import * as service from "./feedback.service.js";
import { authenticate } from "../../middleware/authentication.js";
import { authorize } from "../../middleware/authorization.js";

const router = express.Router();

// Public routes
router.get("/public", service.getPublicFeedbacks);

// Protected routes
router.use(authenticate);

// General routes
router.post("/", service.createFeedback);
router.get("/my", service.getMyFeedbacks);
router.put("/:id", service.updateFeedback);
router.delete("/:id", service.deleteFeedback);

// General routes
router.get("/:sessionId", service.getFeedbacksBySession);

export default router;
