import express from "express";
import { authenticate, authorize } from "../../middleware/index.js";
import * as service from "./day.service.js";

const router = express.Router();

// Public routes
router.get("/", service.getDays);
router.get("/:id", service.getDayById);

// Protected routes
router.use(authenticate);

// Admin only routes
router.post("/", authorize("admin"), service.createDay);
router.put("/:id", authorize("admin"), service.updateDay);
router.delete("/:id", authorize("admin"), service.deleteDay);

export default router;
