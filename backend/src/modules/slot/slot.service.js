import Day from "../../DB/models/day.model.js";
import Slot from "../../DB/models/slot.model.js";
import { sendError, sendSuccess } from "../../utils/response.js";
import { isTimeSlotAvailable } from "../../utils/time.js";

// @desc    Create time slot
// @route   POST /api/v1/slots
// @access  Private/Interviewer
export const createSlot = async (req, res, next) => {
  try {
    const { dayId, startTime, endTime, maxCandidates = 1, notes } = req.body;

    // Check if day exists
    const day = await Day.findById(dayId);
    if (!day) {
      return sendError(res, "Interview day not found", 404);
    }

    // Check for overlapping slots for the same interviewer
    const existingSlots = await Slot.find({
      dayId,
      interviewerId: req.user._id,
      status: { $in: ["available", "pending"] },
    });

    if (!isTimeSlotAvailable(startTime, endTime, existingSlots)) {
      return sendError(res, "Time slot overlaps with existing slot", 400);
    }

    const slot = await Slot.create({
      dayId,
      startTime,
      endTime,
      interviewerId: req.user._id,
      maxCandidates,
      notes,
    });

    await slot.populate("dayId", "date title");
    await slot.populate("interviewerId", "name email");

    sendSuccess(res, "Time slot created successfully", { slot }, 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Get slots by day
// @route   GET /api/v1/slots/:dayId
// @access  Public
export const getSlotsByDay = async (req, res, next) => {
  try {
    const { dayId } = req.params;
    const { status, interviewerId } = req.query;

    let query = { dayId };

    if (status) {
      query.status = status;
    }

    if (interviewerId) {
      query.interviewerId = interviewerId;
    }

    const slots = await Slot.find(query)
      .populate("dayId", "date title")
      .populate("interviewerId", "name email avatarUrl")
      .sort({ startTime: 1 });

    sendSuccess(res, "Time slots retrieved successfully", { slots });
  } catch (error) {
    next(error);
  }
};

// @desc    Get my slots (for interviewers)
// @route   GET /api/v1/slots/my
// @access  Private/Interviewer
export const getMySlots = async (req, res, next) => {
  try {
    const { status, dayId } = req.query;

    let query = { interviewerId: req.user._id };

    if (status) {
      query.status = status;
    }

    if (dayId) {
      query.dayId = dayId;
    }

    const slots = await Slot.find(query)
      .populate("dayId", "date title")
      .sort({ "dayId.date": 1, startTime: 1 });

    sendSuccess(res, "My time slots retrieved successfully", { slots });
  } catch (error) {
    next(error);
  }
};

// @desc    Update time slot
// @route   PUT /api/v1/slots/:id
// @access  Private/Interviewer
export const updateSlot = async (req, res, next) => {
  try {
    const { startTime, endTime, maxCandidates, notes, status } = req.body;

    const slot = await Slot.findById(req.params.id);
    if (!slot) {
      return sendError(res, "Time slot not found", 404);
    }

    // Check if user owns this slot
    if (slot.interviewerId.toString() !== req.user._id.toString()) {
      return sendError(res, "Not authorized to update this slot", 403);
    }

    // Check for overlapping slots if time is being changed
    if (startTime || endTime) {
      const newStartTime = startTime || slot.startTime;
      const newEndTime = endTime || slot.endTime;

      const existingSlots = await Slot.find({
        dayId: slot.dayId,
        interviewerId: req.user._id,
        _id: { $ne: slot._id },
        status: { $in: ["available", "pending"] },
      });

      if (!isTimeSlotAvailable(newStartTime, newEndTime, existingSlots)) {
        return sendError(res, "Time slot overlaps with existing slot", 400);
      }
    }

    const updatedSlot = await Slot.findByIdAndUpdate(
      req.params.id,
      { startTime, endTime, maxCandidates, notes, status },
      { new: true, runValidators: true }
    )
      .populate("dayId", "date title")
      .populate("interviewerId", "name email");

    sendSuccess(res, "Time slot updated successfully", { slot: updatedSlot });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete time slot
// @route   DELETE /api/v1/slots/:id
// @access  Private/Interviewer
export const deleteSlot = async (req, res, next) => {
  try {
    const slot = await Slot.findById(req.params.id);
    if (!slot) {
      return sendError(res, "Time slot not found", 404);
    }

    // Check if user owns this slot
    if (slot.interviewerId.toString() !== req.user._id.toString()) {
      return sendError(res, "Not authorized to delete this slot", 403);
    }

    // Check if slot has reservations
    if (slot.status === "booked") {
      return sendError(
        res,
        "Cannot delete slot with existing reservations",
        400
      );
    }

    await Slot.findByIdAndDelete(req.params.id);

    sendSuccess(res, "Time slot deleted successfully");
  } catch (error) {
    next(error);
  }
};
