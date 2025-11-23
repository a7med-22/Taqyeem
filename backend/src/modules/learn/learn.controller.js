import express from "express";
import { authenticate, authorize, validation } from "../../middleware/index.js";
import * as service from "./learn.service.js";
import {
  contentIdSchema,
  createEducationalContentSchema,
  updateEducationalContentSchema,
} from "./learn.validation.js";

const router = express.Router();

// Public routes
router.get("/", service.getEducationalContent);
router.get("/categories", service.getCategories);
router.get(
  "/:id",
  validation(contentIdSchema),
  service.getEducationalContentById
);

// Protected routes
router.use(authenticate);

// Admin routes
router.post(
  "/",
  authorize("admin"),
  validation(createEducationalContentSchema),
  service.createEducationalContent
);
router.put(
  "/:id",
  authorize("admin"),
  validation(updateEducationalContentSchema),
  service.updateEducationalContent
);
router.delete(
  "/:id",
  authorize("admin"),
  validation(contentIdSchema),
  service.deleteEducationalContent
);
router.get("/stats", authorize("admin"), service.getContentStats);

export default router;
