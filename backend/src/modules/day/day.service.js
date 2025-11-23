import Day from "../../DB/models/day.model.js";
import { sendError, sendSuccess } from "../../utils/index.js";

// @desc    Create interview day
// @route   POST /api/v1/days
// @access  Private/Admin
export const createDay = async (req, res, next) => {
  try {
    const { date, title, description } = req.body;

    const day = await Day.create({
      date,
      title,
      description,
      createdBy: req.user._id,
    });

    sendSuccess(res, "Interview day created successfully", { day }, 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all interview days
// @route   GET /api/v1/days
// @access  Public
export const getDays = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, active } = req.query;

    let query = {};
    if (active === "true") {
      query.isActive = true;
    }

    const days = await Day.find(query)
      .populate("createdBy", "name email")
      .sort({ date: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Day.countDocuments(query);

    sendSuccess(res, "Interview days retrieved successfully", {
      days,
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

// @desc    Get day by ID
// @route   GET /api/v1/days/:id
// @access  Public
export const getDayById = async (req, res, next) => {
  try {
    const day = await Day.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!day) {
      return sendError(res, "Interview day not found", 404);
    }

    sendSuccess(res, "Interview day retrieved successfully", { day });
  } catch (error) {
    next(error);
  }
};

// @desc    Update interview day
// @route   PUT /api/v1/days/:id
// @access  Private/Admin
export const updateDay = async (req, res, next) => {
  try {
    const { title, description, isActive } = req.body;

    const day = await Day.findByIdAndUpdate(
      req.params.id,
      { title, description, isActive },
      { new: true, runValidators: true }
    );

    if (!day) {
      return sendError(res, "Interview day not found", 404);
    }

    sendSuccess(res, "Interview day updated successfully", { day });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete interview day
// @route   DELETE /api/v1/days/:id
// @access  Private/Admin
export const deleteDay = async (req, res, next) => {
  try {
    const day = await Day.findByIdAndDelete(req.params.id);

    if (!day) {
      return sendError(res, "Interview day not found", 404);
    }

    sendSuccess(res, "Interview day deleted successfully");
  } catch (error) {
    next(error);
  }
};
