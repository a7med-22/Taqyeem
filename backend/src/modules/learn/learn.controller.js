import express from "express";
import { authenticate, optionalAuthenticate, authorize, validation } from "../../middleware/index.js";
import { cloudFileUpload, fileTypes } from "../../utils/multer/cloud.multer.js";
import * as service from "./learn.service.js";
import {
  contentIdSchema,
  createEducationalContentSchema,
  updateEducationalContentSchema,
  bulkCreateEducationalContentSchema,
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
// Bulk create endpoint (JSON only - for bulk uploads via Insomnia)
router.post(
  "/bulk",
  authenticate,
  authorize("admin"),
  validation(bulkCreateEducationalContentSchema),
  service.bulkCreateEducationalContent
);

// Single create endpoint (supports both JSON and FormData - for dashboard)
// Middleware to handle both JSON and multipart/form-data
const handleUpload = (req, res, next) => {
  // If content-type is multipart/form-data, use multer
  if (req.headers["content-type"]?.includes("multipart/form-data")) {
    return uploadImage.single("thumbnail")(req, res, next);
  }
  // Otherwise, skip multer and let express.json() handle it
  next();
};

// Middleware to parse JSON strings from FormData and clean arrays before validation
const parseFormDataFields = (req, res, next) => {
  const parseField = (field) => {
    if (field === undefined || field === null) return undefined;
    if (typeof field === "string") {
      try {
        return JSON.parse(field);
      } catch {
        return field;
      }
    }
    return field;
  };

  // Strip _id fields from array items (for references and recommendedVideos)
  const cleanArray = (arr) => {
    if (!Array.isArray(arr)) return arr;
    return arr.map(item => {
      if (typeof item === "object" && item !== null) {
        const { _id, ...rest } = item;
        return rest;
      }
      return item;
    });
  };

  // Only parse if it's FormData (multipart/form-data)
  if (req.headers["content-type"]?.includes("multipart/form-data")) {
    // Parse fields that are sent as JSON strings
    if (req.body.title !== undefined) {
      req.body.title = parseField(req.body.title);
    }
    if (req.body.content !== undefined) {
      req.body.content = parseField(req.body.content);
    }
    if (req.body.tags !== undefined) {
      req.body.tags = parseField(req.body.tags);
    }
    if (req.body.references !== undefined) {
      req.body.references = parseField(req.body.references);
    }
    if (req.body.recommendedVideos !== undefined) {
      req.body.recommendedVideos = parseField(req.body.recommendedVideos);
    }
    
    // Parse boolean fields
    if (req.body.featured !== undefined) {
      req.body.featured = typeof req.body.featured === "string" 
        ? req.body.featured === "true" 
        : Boolean(req.body.featured);
    }
    if (req.body.isPublished !== undefined) {
      req.body.isPublished = typeof req.body.isPublished === "string" 
        ? req.body.isPublished === "true" 
        : Boolean(req.body.isPublished);
    }
  }

  // Clean _id fields from arrays (for both FormData and JSON requests)
  if (req.body.references !== undefined && Array.isArray(req.body.references)) {
    req.body.references = cleanArray(req.body.references);
  }
  if (req.body.recommendedVideos !== undefined && Array.isArray(req.body.recommendedVideos)) {
    req.body.recommendedVideos = cleanArray(req.body.recommendedVideos);
  }

  next();
};

router.post(
  "/",
  authenticate,
  authorize("admin"),
  handleUpload,
  parseFormDataFields,
  validation(createEducationalContentSchema),
  service.createEducationalContent
);
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  handleUpload,
  parseFormDataFields,
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
