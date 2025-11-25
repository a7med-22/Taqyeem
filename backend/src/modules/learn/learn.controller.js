import express from "express";
import { authenticate, optionalAuthenticate, authorize, validation } from "../../middleware/index.js";
import { cloudFileUpload, fileTypes } from "../../utils/multer/cloud.multer.js";
import * as service from "./learn.service.js";
import {
  contentIdSchema,
  createEducationalContentSchema,
  updateEducationalContentSchema,
} from "./learn.validation.js";

const router = express.Router();

// Multer configuration for image upload (for articles)
const uploadImage = cloudFileUpload({ typeNeeded: fileTypes.image });

// Public routes (with optional auth for admin access)
router.get("/", optionalAuthenticate, service.getEducationalContent);
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
  authenticate,
  authorize("admin"),
  uploadImage.single("thumbnail"),
  validation(createEducationalContentSchema),
  service.createEducationalContent
);
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  uploadImage.single("thumbnail"),
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
