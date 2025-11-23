import Evaluation from "../../DB/models/evaluation.model.js";
import Session from "../../DB/models/session.model.js";
import { sendError, sendSuccess } from "../../utils/response.js";

// @desc    Create evaluation
// @route   POST /api/v1/evaluations
// @access  Private/Interviewer
export const createEvaluation = async (req, res, next) => {
  try {
    const { sessionId, criteria, notes } = req.body;

    // Check if session exists and is completed
    const session = await Session.findById(sessionId);
    if (!session) {
      return sendError(res, "Session not found", 404);
    }

    if (session.status !== "completed") {
      return sendError(res, "Session must be completed before evaluation", 400);
    }

    // Check if user is the interviewer
    if (session.interviewerId.toString() !== req.user._id.toString()) {
      return sendError(res, "Not authorized to evaluate this session", 403);
    }

    // Check if evaluation already exists
    const existingEvaluation = await Evaluation.findOne({ sessionId });
    if (existingEvaluation) {
      return sendError(res, "Evaluation already exists for this session", 400);
    }

    const evaluation = await Evaluation.create({
      sessionId,
      candidateId: session.candidateId,
      interviewerId: session.interviewerId,
      criteria,
      notes,
      evaluationType: "manual",
    });

    await evaluation.populate("sessionId", "date startTime endTime");
    await evaluation.populate("candidateId", "name email");
    await evaluation.populate("interviewerId", "name email");

    sendSuccess(res, "Evaluation created successfully", { evaluation }, 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Get evaluation by session ID
// @route   GET /api/v1/evaluations/:sessionId
// @access  Private
export const getEvaluationBySession = async (req, res, next) => {
  try {
    const evaluation = await Evaluation.findOne({
      sessionId: req.params.sessionId,
    })
      .populate("sessionId", "date startTime endTime")
      .populate("candidateId", "name email avatarUrl")
      .populate("interviewerId", "name email avatarUrl");

    if (!evaluation) {
      return sendError(res, "Evaluation not found", 404);
    }

    // Check if user is authorized to view this evaluation
    const isAuthorized =
      req.user.role === "admin" ||
      evaluation.candidateId._id.toString() === req.user._id.toString() ||
      evaluation.interviewerId._id.toString() === req.user._id.toString();

    if (!isAuthorized) {
      return sendError(res, "Not authorized to view this evaluation", 403);
    }

    sendSuccess(res, "Evaluation retrieved successfully", { evaluation });
  } catch (error) {
    next(error);
  }
};

// @desc    Update evaluation
// @route   PUT /api/v1/evaluations/:id
// @access  Private/Interviewer
export const updateEvaluation = async (req, res, next) => {
  try {
    const { criteria, notes } = req.body;

    const evaluation = await Evaluation.findById(req.params.id);
    if (!evaluation) {
      return sendError(res, "Evaluation not found", 404);
    }

    // Check if user is the interviewer
    if (evaluation.interviewerId.toString() !== req.user._id.toString()) {
      return sendError(res, "Not authorized to update this evaluation", 403);
    }

    const updatedEvaluation = await Evaluation.findByIdAndUpdate(
      req.params.id,
      { criteria, notes },
      { new: true, runValidators: true }
    )
      .populate("sessionId", "date startTime endTime")
      .populate("candidateId", "name email")
      .populate("interviewerId", "name email");

    sendSuccess(res, "Evaluation updated successfully", {
      evaluation: updatedEvaluation,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get my evaluations
// @route   GET /api/v1/evaluations/my
// @access  Private
export const getMyEvaluations = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    let query = {};

    if (req.user.role === "candidate") {
      query.candidateId = req.user._id;
    } else if (req.user.role === "interviewer") {
      query.interviewerId = req.user._id;
    }

    const evaluations = await Evaluation.find(query)
      .populate("sessionId", "date startTime endTime")
      .populate("candidateId", "name email avatarUrl")
      .populate("interviewerId", "name email avatarUrl")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Evaluation.countDocuments(query);

    sendSuccess(res, "Evaluations retrieved successfully", {
      evaluations,
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

// @desc    Get evaluation statistics
// @route   GET /api/v1/evaluations/stats
// @access  Private/Admin
export const getEvaluationStats = async (req, res, next) => {
  try {
    const stats = await Evaluation.aggregate([
      {
        $group: {
          _id: null,
          totalEvaluations: { $sum: 1 },
          averageScore: { $avg: "$overallScore" },
          maxScore: { $max: "$overallScore" },
          minScore: { $min: "$overallScore" },
        },
      },
    ]);

    const criteriaStats = await Evaluation.aggregate([
      {
        $group: {
          _id: null,
          avgCommunication: { $avg: "$criteria.communication.score" },
          avgTechnical: { $avg: "$criteria.technical.score" },
          avgProblemSolving: { $avg: "$criteria.problemSolving.score" },
          avgConfidence: { $avg: "$criteria.confidence.score" },
        },
      },
    ]);

    sendSuccess(res, "Evaluation statistics retrieved successfully", {
      overall: stats[0] || {},
      criteria: criteriaStats[0] || {},
    });
  } catch (error) {
    next(error);
  }
};
