import Reservation from "../../DB/models/reservation.model.js";
import Session from "../../DB/models/session.model.js";
import Slot from "../../DB/models/slot.model.js";
import { successResponse } from "../../utils/index.js";

// @desc    Create reservation
// @route   POST /api/v1/reservations
// @access  Private/Candidate
export const createReservation = async (req, res, next) => {
  const { slotId, note } = req.body;

  // Check if slot exists and is available
  const slot = await Slot.findById(slotId);
  if (!slot) {
    throw new Error("Time slot not found", { cause: 404 });
  }

  if (slot.status !== "available") {
    throw new Error("Time slot is not available", { cause: 400 });
  }

  // Check if slot is full
  if (slot.currentCandidates >= slot.maxCandidates) {
    throw new Error("Time slot is full", { cause: 400 });
  }

  // Check if user already has an active reservation for this slot (not rejected)
  const existingReservation = await Reservation.findOne({
    candidateId: req.user._id,
    slotId,
    status: { $in: ["pending", "accepted"] },
  });

  if (existingReservation) {
    throw new Error("You already have a reservation for this slot", {
      cause: 400,
    });
  }

  // Delete any rejected reservation for this slot to avoid unique index conflict
  await Reservation.deleteMany({
    candidateId: req.user._id,
    slotId,
    status: "rejected",
  });

  // Create reservation
  const reservation = await Reservation.create({
    candidateId: req.user._id,
    slotId,
    interviewerId: slot.interviewerId,
    note,
  });

  // Update slot status and candidate count
  slot.currentCandidates += 1;
  slot.status =
    slot.currentCandidates >= slot.maxCandidates ? "booked" : "pending";
  await slot.save();

  await reservation.populate("slotId", "startTime endTime");
  await reservation.populate("candidateId", "name email");
  await reservation.populate("interviewerId", "name email");

  successResponse({
    res,
    message: "Reservation created successfully",
    data: { reservation },
    status: 201,
  });
};

// @desc    Get my reservations
// @route   GET /api/v1/reservations/me
// @desc    Get my reservations
// @route   GET /api/v1/reservations/me
// @access  Private
export const getMyReservations = async (req, res, next) => {
  const { status } = req.query;

  let query = {};

  if (req.user.role === "candidate") {
    query.candidateId = req.user._id;
  } else if (req.user.role === "interviewer") {
    query.interviewerId = req.user._id;
  }

  if (status) {
    query.status = status;
  }

  const reservations = await Reservation.find(query)
    .populate("slotId", "startTime endTime date")
    .populate("candidateId", "name email avatarUrl")
    .populate("interviewerId", "name email avatarUrl specialization")
    .sort({ createdAt: -1 });

  successResponse({
    res,
    message: "Reservations retrieved successfully",
    data: { reservations },
  });
};

// @desc    Get pending reservations (for interviewers)
// @route   GET /api/v1/reservations/pending
// @access  Private/Interviewer
export const getPendingReservations = async (req, res, next) => {
  const reservations = await Reservation.find({
    interviewerId: req.user._id,
    status: "pending",
  })
    .populate("slotId", "startTime endTime date")
    .populate("candidateId", "name email avatarUrl")
    .populate("interviewerId", "name email avatarUrl specialization")
    .sort({ createdAt: 1 });

  successResponse({
    res,
    message: "Pending reservations retrieved successfully",
    data: { reservations },
  });
};

// @desc    Accept reservation
// @route   POST /api/v1/reservations/:id/accept
// @access  Private/Interviewer
export const acceptReservation = async (req, res, next) => {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) {
    throw new Error("Reservation not found", { cause: 404 });
  }
  // Check if user is the interviewer
  if (reservation.interviewerId.toString() !== req.user._id.toString()) {
    throw new Error("Not authorized to accept this reservation", {
      cause: 403,
    });
  }

  if (reservation.status !== "pending") {
    throw new Error("Reservation is not pending", { cause: 400 });
  }

  // Update reservation
  reservation.status = "accepted";
  reservation.respondedAt = new Date();
  reservation.respondedBy = req.user._id;
  await reservation.save();

  // Create session
  const slot = await Slot.findById(reservation.slotId);
  const session = await Session.create({
    candidateId: reservation.candidateId,
    interviewerId: reservation.interviewerId,
    reservationId: reservation._id,
    date: slot.date,
    startTime: slot.startTime,
    endTime: slot.endTime,
  });

  await reservation.populate("slotId", "startTime endTime");
  await reservation.populate("candidateId", "name email");
  await reservation.populate("interviewerId", "name email");

  successResponse({
    res,
    message: "Reservation accepted successfully",
    data: {
      reservation,
      session,
    },
  });
};

// @desc    Reject reservation
// @route   POST /api/v1/reservations/:id/reject
// @access  Private/Interviewer
export const rejectReservation = async (req, res, next) => {
  const { rejectionReason } = req.body;

  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) {
    throw new Error("Reservation not found", { cause: 404 });
  }

  // Check if user is the interviewer
  if (reservation.interviewerId.toString() !== req.user._id.toString()) {
    throw new Error("Not authorized to reject this reservation", {
      cause: 403,
    });
  }

  if (reservation.status !== "pending") {
    throw new Error("Reservation is not pending", { cause: 400 });
  }

  // Update reservation
  reservation.status = "rejected";
  reservation.rejectionReason = rejectionReason;
  reservation.respondedAt = new Date();
  reservation.respondedBy = req.user._id;
  await reservation.save();

  // Update slot candidate count
  const slot = await Slot.findById(reservation.slotId);
  slot.currentCandidates -= 1;
  slot.status = slot.currentCandidates === 0 ? "available" : "pending";
  await slot.save();

  await reservation.populate("slotId", "startTime endTime");
  await reservation.populate("candidateId", "name email");
  await reservation.populate("interviewerId", "name email");

  successResponse({
    res,
    message: "Reservation rejected successfully",
    data: { reservation },
  });
};
