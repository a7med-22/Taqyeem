import express from "express";
import {
  createSlot,
  deleteSlot,
  getMySlots,
  getSlotsByDay,
  updateSlot,
} from "../controllers/slotController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/:dayId", getSlotsByDay);

// Protected routes
router.use(authenticate);

// Interviewer routes
router.post("/", authorize("interviewer", "admin"), createSlot);
router.get("/my", authorize("interviewer", "admin"), getMySlots);
router.put("/:id", authorize("interviewer", "admin"), updateSlot);
router.delete("/:id", authorize("interviewer", "admin"), deleteSlot);

export default router;
