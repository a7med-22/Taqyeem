import express from "express";
import {
  acceptReservation,
  createReservation,
  getMyReservations,
  getPendingReservations,
  rejectReservation,
} from "../controllers/reservationController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

// All routes are protected
router.use(authenticate);

// Candidate routes
router.post("/", authorize("candidate"), createReservation);

// General routes
router.get("/me", getMyReservations);

// Interviewer routes
router.get(
  "/pending",
  authorize("interviewer", "admin"),
  getPendingReservations
);
router.post(
  "/:id/accept",
  authorize("interviewer", "admin"),
  acceptReservation
);
router.post(
  "/:id/reject",
  authorize("interviewer", "admin"),
  rejectReservation
);

export default router;
