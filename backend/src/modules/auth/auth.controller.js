import express from "express";
import { authenticate, validation } from "../../middleware/index.js";
import * as authService from "./auth.service.js";
import { loginSchema, registerSchema } from "./auth.validation.js";

const router = express.Router();

// Public routes
router.post("/register", validation(registerSchema), authService.register);
router.post("/login", validation(loginSchema), authService.login);

// Protected routes
router.get("/me", authenticate, authService.getMe);

export default router;
