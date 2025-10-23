import express from "express";
import { getMe, login, register } from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validation.js";
import { validateLogin, validateRegister } from "../utils/validators.js";

const router = express.Router();

// Public routes
router.post("/register", validateRegister, validateRequest, register);
router.post("/login", validateLogin, validateRequest, login);

// Protected routes
router.get("/me", authenticate, getMe);

export default router;
