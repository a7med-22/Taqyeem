import User from "../../DB/models/user.model.js";
import { sendError, sendSuccess } from "../../utils/index.js";

// @desc    Get all users (Admin only)
// @route   GET /api/v1/users
// @access  Private/Admin
export const getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;

    // Build query
    let query = {};

    if (role) {
      query.role = role;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    sendSuccess(res, "Users retrieved successfully", {
      users,
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

// @desc    Get user by ID
// @route   GET /api/v1/users/:id
// @access  Private
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return sendError(res, "User not found", 404);
    }

    sendSuccess(res, "User retrieved successfully", { user });
  } catch (error) {
    next(error);
  }
};

// @desc    Update current user profile
// @route   PUT /api/v1/users/me
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const { name, language } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, language },
      { new: true, runValidators: true }
    );

    sendSuccess(res, "Profile updated successfully", { user });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user avatar
// @route   PUT /api/v1/users/me/avatar
// @access  Private
export const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return sendError(res, "Please upload an image file", 400);
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatarUrl: req.file.path },
      { new: true }
    );

    sendSuccess(res, "Avatar updated successfully", { user });
  } catch (error) {
    next(error);
  }
};

// @desc    Deactivate user account
// @route   PUT /api/v1/users/me/deactivate
// @access  Private
export const deactivateAccount = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { isActive: false });

    sendSuccess(res, "Account deactivated successfully");
  } catch (error) {
    next(error);
  }
};
