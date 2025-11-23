import express from "express";
import { authenticate, validateRequest } from "../../middleware/index.js";
import * as authService from "./auth.service.js";
import { validateLogin, validateRegister } from "./auth.validation.js";

const router = express.Router();

// Public routes
router.post(
  "/register",
  validateRegister,
  validateRequest,
  authService.register
);
router.post("/login", validateLogin, validateRequest, authService.login);

// Protected routes
router.get("/me", authenticate, authService.getMe);

export default router;
