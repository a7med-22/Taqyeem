import express from "express";
import * as service from "./learn.service.js";
import { authenticate } from "../../middleware/authentication.js";
import { authorize } from "../../middleware/authorization.js";

const router = express.Router();

// Public routes
router.get("/", service.getEducationalContent);
router.get("/categories", service.getCategories);
router.get("/:id", service.getEducationalContentById);

// Protected routes
router.use(authenticate);

// Admin routes
router.post("/", authorize("admin"), service.createEducationalContent);
router.put("/:id", authorize("admin"), service.updateEducationalContent);
router.delete("/:id", authorize("admin"), service.deleteEducationalContent);
router.get("/stats", authorize("admin"), service.getContentStats);

export default router;
