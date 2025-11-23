import User from "../../DB/models/user.model.js";
import { successResponse } from "../../utils/index.js";

// @desc    Get all users (Admin only)
// @route   GET /api/v1/users
// @access  Private/Admin
export const getUsers = async (req, res, next) => {
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

  successResponse({
    res,
    message: "Users retrieved successfully",
    data: {
      users,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
      },
    },
  });
};

// @desc    Get user by ID
// @route   GET /api/v1/users/:id
// @access  Private
export const getUserById = async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    throw new Error("User not found", { cause: 404 });
  }

  successResponse({
    res,
    message: "User retrieved successfully",
    data: { user },
  });
};

// @desc    Update current user profile
// @route   PUT /api/v1/users/me
// @access  Private
export const updateProfile = async (req, res, next) => {
  const { name, language } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name, language },
    { new: true, runValidators: true }
  );

  successResponse({
    res,
    message: "Profile updated successfully",
    data: { user },
  });
};

// @desc    Update user avatar
// @route   PUT /api/v1/users/me/avatar
// @access  Private
export const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    throw new Error("Please upload an image file", { cause: 400 });
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { avatarUrl: req.file.path },
    { new: true }
  );

  successResponse({
    res,
    message: "Avatar updated successfully",
    data: { user },
  });
};

// @desc    Deactivate user account
// @route   PUT /api/v1/users/me/deactivate
// @access  Private
export const deactivateAccount = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { isActive: false });

  successResponse({
    res,
    message: "Account deactivated successfully",
  });
};
