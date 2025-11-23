import Session from "../../DB/models/session.model.js";
import { sendError, sendSuccess } from "../../utils/response.js";

// @desc    Get my sessions
// @route   GET /api/v1/sessions/me
// @access  Private
export const getMySessions = async (req, res, next) => {
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

    const sessions = await Session.find(query)
      .populate("candidateId", "name email avatarUrl")
      .populate("interviewerId", "name email avatarUrl")
      .populate("reservationId", "note")
      .sort({ date: 1, startTime: 1 });

    sendSuccess(res, "Sessions retrieved successfully", { sessions });
  } catch (error) {
    next(error);
  }
};

// @desc    Get session by ID
// @route   GET /api/v1/sessions/:id
// @access  Private
export const getSessionById = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate("candidateId", "name email avatarUrl")
      .populate("interviewerId", "name email avatarUrl")
      .populate("reservationId", "note");

    if (!session) {
      return sendError(res, "Session not found", 404);
    }

    // Check if user is authorized to view this session
    const isAuthorized =
      req.user.role === "admin" ||
      session.candidateId._id.toString() === req.user._id.toString() ||
      session.interviewerId._id.toString() === req.user._id.toString();

    if (!isAuthorized) {
      return sendError(res, "Not authorized to view this session", 403);
    }

    sendSuccess(res, "Session retrieved successfully", { session });
  } catch (error) {
    next(error);
  }
};

// @desc    Start session
// @route   POST /api/v1/sessions/:id/start
// @access  Private/Interviewer
export const startSession = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return sendError(res, "Session not found", 404);
    }

    // Check if user is the interviewer
    if (session.interviewerId.toString() !== req.user._id.toString()) {
      return sendError(res, "Not authorized to start this session", 403);
    }

    if (session.status !== "scheduled") {
      return sendError(res, "Session is not scheduled", 400);
    }

    session.status = "in-progress";
    session.actualStartTime = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
    await session.save();

    sendSuccess(res, "Session started successfully", { session });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload session recording
// @route   POST /api/v1/sessions/:id/recording
// @access  Private/Interviewer
export const uploadRecording = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return sendError(res, "Session not found", 404);
    }

    // Check if user is the interviewer
    if (session.interviewerId.toString() !== req.user._id.toString()) {
      return sendError(
        res,
        "Not authorized to upload recording for this session",
        403
      );
    }

    if (!req.file) {
      return sendError(res, "Please upload a recording file", 400);
    }

    session.recordingUrl = req.file.path;
    await session.save();

    sendSuccess(res, "Recording uploaded successfully", { session });
  } catch (error) {
    next(error);
  }
};

// @desc    Complete session
// @route   POST /api/v1/sessions/:id/complete
// @access  Private/Interviewer
export const completeSession = async (req, res, next) => {
  try {
    const { notes } = req.body;

    const session = await Session.findById(req.params.id);
    if (!session) {
      return sendError(res, "Session not found", 404);
    }

    // Check if user is the interviewer
    if (session.interviewerId.toString() !== req.user._id.toString()) {
      return sendError(res, "Not authorized to complete this session", 403);
    }

    if (session.status !== "in-progress") {
      return sendError(res, "Session is not in progress", 400);
    }

    session.status = "completed";
    session.actualEndTime = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
    session.notes = notes;
    await session.save();

    sendSuccess(res, "Session completed successfully", { session });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel session
// @route   POST /api/v1/sessions/:id/cancel
// @access  Private
export const cancelSession = async (req, res, next) => {
  try {
    const { cancelledReason } = req.body;

    const session = await Session.findById(req.params.id);
    if (!session) {
      return sendError(res, "Session not found", 404);
    }

    // Check if user is authorized to cancel
    const isAuthorized =
      req.user.role === "admin" ||
      session.candidateId.toString() === req.user._id.toString() ||
      session.interviewerId.toString() === req.user._id.toString();

    if (!isAuthorized) {
      return sendError(res, "Not authorized to cancel this session", 403);
    }

    if (session.status === "completed") {
      return sendError(res, "Cannot cancel completed session", 400);
    }

    session.status = "cancelled";
    session.cancelledReason = cancelledReason;
    await session.save();

    sendSuccess(res, "Session cancelled successfully", { session });
  } catch (error) {
    next(error);
  }
};
