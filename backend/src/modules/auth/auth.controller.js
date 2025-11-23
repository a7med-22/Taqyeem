import express from "express";
import { authenticate } from "../../middleware/authentication.js";
import { validate } from "../../utils/validation.js";
import * as authService from "./auth.service.js";
import { validateLogin, validateRegister } from "./auth.validation.js";

const router = express.Router();

// Public routes
router.post("/register", validateRegister, validate, authService.register);
router.post("/login", validateLogin, validate, authService.login);

// Protected routes
router.get("/me", authenticate, authService.getMe);

export default router;
