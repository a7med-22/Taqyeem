import express from "express";
import { authenticate } from "../../middleware/authentication.js";
import { authorize } from "../../middleware/authorization.js";
import upload from "../../utils/multer/cloud.multer.js";
import { validate } from "../../utils/validation.js";
import * as userService from "./user.service.js";
import { validateUserUpdate } from "./user.validation.js";

const router = express.Router();

// All routes are protected
router.use(authenticate);

// User management routes
router.get("/", authorize("admin"), userService.getUsers);
router.get("/:id", userService.getUserById);
router.put("/me", validateUserUpdate, validate, userService.updateProfile);
router.put("/me/avatar", upload.single("avatar"), userService.updateAvatar);
router.put("/me/deactivate", userService.deactivateAccount);

export default router;
