import EducationalContent from "../models/EducationalContent.js";
import { sendError, sendSuccess } from "../utils/response.js";

// @desc    Get all educational content
// @route   GET /api/v1/learn
// @access  Public
export const getEducationalContent = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      type,
      category,
      featured,
      search,
      language = "en",
    } = req.query;

    let query = { isPublished: true };

    if (type) {
      query.type = type;
    }

    if (category) {
      query.category = category;
    }

    if (featured === "true") {
      query.featured = true;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const content = await EducationalContent.find(query)
      .populate("authorId", "name email avatarUrl")
      .sort({ featured: -1, publishedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await EducationalContent.countDocuments(query);

    sendSuccess(res, "Educational content retrieved successfully", {
      content,
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

// @desc    Get educational content by ID
// @route   GET /api/v1/learn/:id
// @access  Public
export const getEducationalContentById = async (req, res, next) => {
  try {
    const content = await EducationalContent.findById(req.params.id).populate(
      "authorId",
      "name email avatarUrl"
    );

    if (!content) {
      return sendError(res, "Educational content not found", 404);
    }

    if (!content.isPublished && req.user?.role !== "admin") {
      return sendError(res, "Content not published", 404);
    }

    // Increment view count
    content.viewCount += 1;
    await content.save();

    sendSuccess(res, "Educational content retrieved successfully", { content });
  } catch (error) {
    next(error);
  }
};

// @desc    Create educational content
// @route   POST /api/v1/learn
// @access  Private/Admin
export const createEducationalContent = async (req, res, next) => {
  try {
    const {
      type,
      title,
      content,
      category,
      tags = [],
      featured = false,
    } = req.body;

    const educationalContent = await EducationalContent.create({
      type,
      title,
      content,
      category,
      authorId: req.user._id,
      tags,
      featured,
      isPublished: false,
    });

    await educationalContent.populate("authorId", "name email");

    sendSuccess(
      res,
      "Educational content created successfully",
      {
        content: educationalContent,
      },
      201
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Update educational content
// @route   PUT /api/v1/learn/:id
// @access  Private/Admin
export const updateEducationalContent = async (req, res, next) => {
  try {
    const { title, content, category, tags, featured, isPublished } = req.body;

    const educationalContent = await EducationalContent.findById(req.params.id);
    if (!educationalContent) {
      return sendError(res, "Educational content not found", 404);
    }

    const updatedContent = await EducationalContent.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        category,
        tags,
        featured,
        isPublished,
        publishedAt:
          isPublished && !educationalContent.isPublished
            ? new Date()
            : educationalContent.publishedAt,
      },
      { new: true, runValidators: true }
    ).populate("authorId", "name email");

    sendSuccess(res, "Educational content updated successfully", {
      content: updatedContent,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete educational content
// @route   DELETE /api/v1/learn/:id
// @access  Private/Admin
export const deleteEducationalContent = async (req, res, next) => {
  try {
    const educationalContent = await EducationalContent.findByIdAndDelete(
      req.params.id
    );

    if (!educationalContent) {
      return sendError(res, "Educational content not found", 404);
    }

    sendSuccess(res, "Educational content deleted successfully");
  } catch (error) {
    next(error);
  }
};

// @desc    Get content categories
// @route   GET /api/v1/learn/categories
// @access  Public
export const getCategories = async (req, res, next) => {
  try {
    const categories = await EducationalContent.distinct("category", {
      isPublished: true,
    });

    sendSuccess(res, "Categories retrieved successfully", { categories });
  } catch (error) {
    next(error);
  }
};

// @desc    Get content statistics
// @route   GET /api/v1/learn/stats
// @access  Private/Admin
export const getContentStats = async (req, res, next) => {
  try {
    const stats = await EducationalContent.aggregate([
      {
        $group: {
          _id: null,
          totalContent: { $sum: 1 },
          publishedContent: {
            $sum: { $cond: ["$isPublished", 1, 0] },
          },
          totalViews: { $sum: "$viewCount" },
          totalLikes: { $sum: "$likeCount" },
        },
      },
    ]);

    const categoryStats = await EducationalContent.aggregate([
      { $match: { isPublished: true } },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          totalViews: { $sum: "$viewCount" },
        },
      },
      { $sort: { count: -1 } },
    ]);

    sendSuccess(res, "Content statistics retrieved successfully", {
      overall: stats[0] || {},
      categories: categoryStats,
    });
  } catch (error) {
    next(error);
  }
};
