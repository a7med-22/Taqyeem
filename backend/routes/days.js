import express from "express";
import {
  createDay,
  deleteDay,
  getDayById,
  getDays,
  updateDay,
} from "../controllers/dayController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getDays);
router.get("/:id", getDayById);

// Protected routes
router.use(authenticate);

// Admin only routes
router.post("/", authorize("admin"), createDay);
router.put("/:id", authorize("admin"), updateDay);
router.delete("/:id", authorize("admin"), deleteDay);

export default router;
