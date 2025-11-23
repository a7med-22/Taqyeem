import express from "express";
import { authenticate, authorize, validation } from "../../middleware/index.js";
import upload from "../../utils/multer/cloud.multer.js";
import * as userService from "./user.service.js";
import { getUserByIdSchema, updateProfileSchema } from "./user.validation.js";

const router = express.Router();

// All routes are protected
router.use(authenticate);

// User management routes
router.get("/", authorize("admin"), userService.getUsers);
router.get("/:id", validation(getUserByIdSchema), userService.getUserById);
router.put("/me", validation(updateProfileSchema), userService.updateProfile);
router.put("/me/avatar", upload.single("avatar"), userService.updateAvatar);
router.put("/me/deactivate", userService.deactivateAccount);

export default router;
