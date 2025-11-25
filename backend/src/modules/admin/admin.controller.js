import express from "express";
import { authenticate, authorize } from "../../middleware/index.js";
import * as service from "./admin.service.js";

const router = express.Router();

// All admin routes require authentication + admin role
router.use(authenticate);
router.use(authorize("admin"));

router.get("/dashboard", service.getDashboard);

export default router;

