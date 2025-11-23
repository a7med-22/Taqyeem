import Reservation from "../../DB/models/reservation.model.js";
import Session from "../../DB/models/session.model.js";
import Slot from "../../DB/models/slot.model.js";
import { sendError, sendSuccess } from "../../utils/index.js";

// @desc    Create reservation
// @route   POST /api/v1/reservations
// @access  Private/Candidate
export const createReservation = async (req, res, next) => {
  try {
    const { slotId, note } = req.body;

    // Check if slot exists and is available
    const slot = await Slot.findById(slotId).populate("dayId", "date title");
    if (!slot) {
      return sendError(res, "Time slot not found", 404);
    }

    if (slot.status !== "available") {
      return sendError(res, "Time slot is not available", 400);
    }

    // Check if slot is full
    if (slot.currentCandidates >= slot.maxCandidates) {
      return sendError(res, "Time slot is full", 400);
    }

    // Check if user already has a reservation for this slot
    const existingReservation = await Reservation.findOne({
      candidateId: req.user._id,
      slotId,
    });

    if (existingReservation) {
      return sendError(
        res,
        "You already have a reservation for this slot",
        400
      );
    }

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

    sendSuccess(res, "Reservation created successfully", { reservation }, 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Get my reservations
// @route   GET /api/v1/reservations/me
// @access  Private
export const getMyReservations = async (req, res, next) => {
  try {
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
      .populate("slotId", "startTime endTime")
      .populate("dayId", "date title")
      .populate("candidateId", "name email avatarUrl")
      .populate("interviewerId", "name email avatarUrl")
      .sort({ createdAt: -1 });

    sendSuccess(res, "Reservations retrieved successfully", { reservations });
  } catch (error) {
    next(error);
  }
};

// @desc    Get pending reservations (for interviewers)
// @route   GET /api/v1/reservations/pending
// @access  Private/Interviewer
export const getPendingReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find({
      interviewerId: req.user._id,
      status: "pending",
    })
      .populate("slotId", "startTime endTime")
      .populate("dayId", "date title")
      .populate("candidateId", "name email avatarUrl")
      .sort({ createdAt: 1 });

    sendSuccess(res, "Pending reservations retrieved successfully", {
      reservations,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Accept reservation
// @route   POST /api/v1/reservations/:id/accept
// @access  Private/Interviewer
export const acceptReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return sendError(res, "Reservation not found", 404);
    }

    // Check if user is the interviewer
    if (reservation.interviewerId.toString() !== req.user._id.toString()) {
      return sendError(res, "Not authorized to accept this reservation", 403);
    }

    if (reservation.status !== "pending") {
      return sendError(res, "Reservation is not pending", 400);
    }

    // Update reservation
    reservation.status = "accepted";
    reservation.respondedAt = new Date();
    reservation.respondedBy = req.user._id;
    await reservation.save();

    // Create session
    const slot = await Slot.findById(reservation.slotId).populate(
      "dayId",
      "date"
    );
    const session = await Session.create({
      candidateId: reservation.candidateId,
      interviewerId: reservation.interviewerId,
      reservationId: reservation._id,
      date: slot.dayId.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
    });

    await reservation.populate("slotId", "startTime endTime");
    await reservation.populate("candidateId", "name email");
    await reservation.populate("interviewerId", "name email");

    sendSuccess(res, "Reservation accepted successfully", {
      reservation,
      session,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reject reservation
// @route   POST /api/v1/reservations/:id/reject
// @access  Private/Interviewer
export const rejectReservation = async (req, res, next) => {
  try {
    const { rejectionReason } = req.body;

    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return sendError(res, "Reservation not found", 404);
    }

    // Check if user is the interviewer
    if (reservation.interviewerId.toString() !== req.user._id.toString()) {
      return sendError(res, "Not authorized to reject this reservation", 403);
    }

    if (reservation.status !== "pending") {
      return sendError(res, "Reservation is not pending", 400);
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

    sendSuccess(res, "Reservation rejected successfully", { reservation });
  } catch (error) {
    next(error);
  }
};
