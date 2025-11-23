import User from "../../DB/models/user.model.js";
import { sendError, sendSuccess } from "../../utils/response.js";
import { generateToken } from "../../utils/token/index.js";

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      role = "candidate",
      language = "en",
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendError(res, "User already exists with this email", 400);
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role,
      language,
    });

    // Generate token
    const token = generateToken(user._id);

    sendSuccess(
      res,
      "User registered successfully",
      {
        user,
        token,
      },
      201
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists and include password
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return sendError(res, "Invalid credentials", 401);
    }

    // Check if user is active
    if (!user.isActive) {
      return sendError(res, "Account is deactivated", 401);
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return sendError(res, "Invalid credentials", 401);
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    // Remove password from response
    user.password = undefined;

    sendSuccess(res, "Login successful", {
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user
// @route   GET /api/v1/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    sendSuccess(res, "User profile retrieved successfully", { user });
  } catch (error) {
    next(error);
  }
};
