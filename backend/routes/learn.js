import express from "express";
import {
  createEducationalContent,
  deleteEducationalContent,
  getCategories,
  getContentStats,
  getEducationalContent,
  getEducationalContentById,
  updateEducationalContent,
} from "../controllers/learnController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getEducationalContent);
router.get("/categories", getCategories);
router.get("/:id", getEducationalContentById);

// Protected routes
router.use(authenticate);

// Admin routes
router.post("/", authorize("admin"), createEducationalContent);
router.put("/:id", authorize("admin"), updateEducationalContent);
router.delete("/:id", authorize("admin"), deleteEducationalContent);
router.get("/stats", authorize("admin"), getContentStats);

export default router;
