import express from "express";
import {
  deactivateAccount,
  getUserById,
  getUsers,
  updateAvatar,
  updateProfile,
} from "../controllers/userController.js";
import { authenticate, authorize } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import { validateRequest } from "../middleware/validation.js";
import { validateUserUpdate } from "../utils/validators.js";

const router = express.Router();

// All routes are protected
router.use(authenticate);

// User management routes
router.get("/", authorize("admin"), getUsers);
router.get("/:id", getUserById);
router.put("/me", validateUserUpdate, validateRequest, updateProfile);
router.put("/me/avatar", upload.single("avatar"), updateAvatar);
router.put("/me/deactivate", deactivateAccount);

export default router;
