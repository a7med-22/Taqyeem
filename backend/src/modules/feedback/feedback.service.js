import Feedback from "../../DB/models/feedback.model.js";
import Session from "../../DB/models/session.model.js";
import { sendError, sendSuccess } from "../../utils/index.js";

// @desc    Create feedback
// @route   POST /api/v1/feedbacks
// @access  Private
export const createFeedback = async (req, res, next) => {
  try {
    const {
      sessionId,
      text,
      feedbackType = "general",
      isPublic = false,
      isAnonymous = false,
    } = req.body;

    // Check if session exists
    const session = await Session.findById(sessionId);
    if (!session) {
      return sendError(res, "Session not found", 404);
    }

    // Check if user is authorized to provide feedback
    const isAuthorized =
      req.user.role === "admin" ||
      session.candidateId.toString() === req.user._id.toString() ||
      session.interviewerId.toString() === req.user._id.toString();

    if (!isAuthorized) {
      return sendError(
        res,
        "Not authorized to provide feedback for this session",
        403
      );
    }

    const feedback = await Feedback.create({
      sessionId,
      text,
      createdBy: req.user._id,
      feedbackType,
      isPublic,
      isAnonymous,
    });

    await feedback.populate("sessionId", "date startTime endTime");
    await feedback.populate("createdBy", "name email");

    sendSuccess(res, "Feedback created successfully", { feedback }, 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Get feedbacks by session ID
// @route   GET /api/v1/feedbacks/:sessionId
// @access  Private
export const getFeedbacksBySession = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.sessionId);
    if (!session) {
      return sendError(res, "Session not found", 404);
    }

    // Check if user is authorized to view feedbacks
    const isAuthorized =
      req.user.role === "admin" ||
      session.candidateId.toString() === req.user._id.toString() ||
      session.interviewerId.toString() === req.user._id.toString();

    if (!isAuthorized) {
      return sendError(
        res,
        "Not authorized to view feedbacks for this session",
        403
      );
    }

    const feedbacks = await Feedback.find({ sessionId: req.params.sessionId })
      .populate("createdBy", "name email avatarUrl")
      .sort({ createdAt: -1 });

    sendSuccess(res, "Feedbacks retrieved successfully", { feedbacks });
  } catch (error) {
    next(error);
  }
};

// @desc    Get my feedbacks
// @route   GET /api/v1/feedbacks/my
// @access  Private
export const getMyFeedbacks = async (req, res, next) => {
  try {
    const { feedbackType, isPublic } = req.query;

    let query = { createdBy: req.user._id };

    if (feedbackType) {
      query.feedbackType = feedbackType;
    }

    if (isPublic !== undefined) {
      query.isPublic = isPublic === "true";
    }

    const feedbacks = await Feedback.find(query)
      .populate("sessionId", "date startTime endTime")
      .populate("candidateId", "name email")
      .populate("interviewerId", "name email")
      .sort({ createdAt: -1 });

    sendSuccess(res, "My feedbacks retrieved successfully", { feedbacks });
  } catch (error) {
    next(error);
  }
};

// @desc    Update feedback
// @route   PUT /api/v1/feedbacks/:id
// @access  Private
export const updateFeedback = async (req, res, next) => {
  try {
    const { text, feedbackType, isPublic, isAnonymous } = req.body;

    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return sendError(res, "Feedback not found", 404);
    }

    // Check if user is the creator
    if (feedback.createdBy.toString() !== req.user._id.toString()) {
      return sendError(res, "Not authorized to update this feedback", 403);
    }

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { text, feedbackType, isPublic, isAnonymous },
      { new: true, runValidators: true }
    )
      .populate("sessionId", "date startTime endTime")
      .populate("createdBy", "name email");

    sendSuccess(res, "Feedback updated successfully", {
      feedback: updatedFeedback,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete feedback
// @route   DELETE /api/v1/feedbacks/:id
// @access  Private
export const deleteFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return sendError(res, "Feedback not found", 404);
    }

    // Check if user is the creator or admin
    if (
      feedback.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return sendError(res, "Not authorized to delete this feedback", 403);
    }

    await Feedback.findByIdAndDelete(req.params.id);

    sendSuccess(res, "Feedback deleted successfully");
  } catch (error) {
    next(error);
  }
};

// @desc    Get public feedbacks
// @route   GET /api/v1/feedbacks/public
// @access  Public
export const getPublicFeedbacks = async (req, res, next) => {
  try {
    const { feedbackType, page = 1, limit = 10 } = req.query;

    let query = { isPublic: true };

    if (feedbackType) {
      query.feedbackType = feedbackType;
    }

    const feedbacks = await Feedback.find(query)
      .populate("sessionId", "date")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Feedback.countDocuments(query);

    sendSuccess(res, "Public feedbacks retrieved successfully", {
      feedbacks,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    next(error);
  }
};
