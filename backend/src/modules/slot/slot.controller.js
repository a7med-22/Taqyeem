import express from "express";
import { authenticate } from "../../middleware/authentication.js";
import { authorize } from "../../middleware/authorization.js";
import * as service from "./slot.service.js";

const router = express.Router();

// Public routes
router.get("/:dayId", service.getSlotsByDay);

// Protected routes
router.use(authenticate);

// Interviewer routes
router.post("/", authorize("interviewer", "admin"), service.createSlot);
router.get("/my", authorize("interviewer", "admin"), service.getMySlots);
router.put("/:id", authorize("interviewer", "admin"), service.updateSlot);
router.delete("/:id", authorize("interviewer", "admin"), service.deleteSlot);

export default router;
