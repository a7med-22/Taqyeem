import express from "express";
import { authenticate } from "../../middleware/authentication.js";
import { authorize } from "../../middleware/authorization.js";
import * as service from "./reservation.service.js";

const router = express.Router();

// All routes are protected
router.use(authenticate);

// Candidate routes
router.post("/", authorize("candidate"), service.createReservation);

// General routes
router.get("/me", service.getMyReservations);

// Interviewer routes
router.get(
  "/pending",
  authorize("interviewer", "admin"),
  service.getPendingReservations
);
router.post(
  "/:id/accept",
  authorize("interviewer", "admin"),
  service.acceptReservation
);
router.post(
  "/:id/reject",
  authorize("interviewer", "admin"),
  service.rejectReservation
);

export default router;
