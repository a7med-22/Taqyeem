import User from "../../DB/models/user.model.js";
import { sendError, sendSuccess } from "../../utils/index.js";
import { uploadFile } from "../../utils/multer/cloudinary.js";
import { generateTokens } from "../../utils/token/generateTokens.js";

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

    // Check if CV is required for interviewer role
    if (role === "interviewer" && !req.file) {
      return sendError(res, "CV is required for interviewer registration", 400);
    }

    // Create user first (without CV)
    const user = await User.create({
      name,
      email,
      password,
      role,
      language,
    });

    // Handle CV upload if file is provided (using user ID for folder organization)
    if (req.file) {
      const uploadResult = await uploadFile({
        file: req.file,
        filePath: `cvs/${user._id}`,
      });

      // Update user with CV information
      user.cvUrl = uploadResult.secure_url;
      user.cvPublicId = uploadResult.public_id;
      await user.save();
    }

    // Generate tokens
    const { access_token, refresh_token } = await generateTokens(user);

    sendSuccess(
      res,
      "User registered successfully",
      {
        user,
        access_token,
        refresh_token,
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

    // Generate tokens
    const { access_token, refresh_token } = await generateTokens(user);

    // Remove password from response
    user.password = undefined;

    sendSuccess(res, "Login successful", {
      user,
      access_token,
      refresh_token,
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
