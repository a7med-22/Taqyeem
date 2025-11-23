import EducationalContent from "../../DB/models/educational-content.model.js";
import { successResponse } from "../../utils/index.js";

// @desc    Get all educational content
// @route   GET /api/v1/learn
// @access  Public
export const getEducationalContent = async (req, res, next) => {
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

  successResponse({
    res,
    message: "Educational content retrieved successfully",
    data: {
      content,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
      },
    },
  });
};

// @desc    Get educational content by ID
// @route   GET /api/v1/learn/:id
// @access  Public
export const getEducationalContentById = async (req, res, next) => {
  const content = await EducationalContent.findById(req.params.id).populate(
    "authorId",
    "name email avatarUrl"
  );

  if (!content) {
    throw new Error("Educational content not found", { cause: 404 });
  }

  if (!content.isPublished && req.user?.role !== "admin") {
    throw new Error("Content not published", { cause: 404 });
  }

  // Increment view count
  content.viewCount += 1;
  await content.save();

  successResponse({
    res,
    message: "Educational content retrieved successfully",
    data: { content },
  });
};

// @desc    Create educational content
// @route   POST /api/v1/learn
// @access  Private/Admin
export const createEducationalContent = async (req, res, next) => {
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

  successResponse({
    res,
    message: "Educational content created successfully",
    data: { content: educationalContent },
    status: 201,
  });
};

// @desc    Update educational content
// @route   PUT /api/v1/learn/:id
// @access  Private/Admin
export const updateEducationalContent = async (req, res, next) => {
  const { title, content, category, tags, featured, isPublished } = req.body;

  const educationalContent = await EducationalContent.findById(req.params.id);
  if (!educationalContent) {
    throw new Error("Educational content not found", { cause: 404 });
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

  successResponse({
    res,
    message: "Educational content updated successfully",
    data: { content: updatedContent },
  });
};

// @desc    Delete educational content
// @route   DELETE /api/v1/learn/:id
// @access  Private/Admin
export const deleteEducationalContent = async (req, res, next) => {
  const educationalContent = await EducationalContent.findByIdAndDelete(
    req.params.id
  );

  if (!educationalContent) {
    throw new Error("Educational content not found", { cause: 404 });
  }

  successResponse({
    res,
    message: "Educational content deleted successfully",
  });
};

// @desc    Get content categories
// @route   GET /api/v1/learn/categories
// @access  Public
export const getCategories = async (req, res, next) => {
  const categories = await EducationalContent.distinct("category", {
    isPublished: true,
  });

  successResponse({
    res,
    message: "Categories retrieved successfully",
    data: { categories },
  });
};

// @desc    Get content statistics
// @route   GET /api/v1/learn/stats
// @access  Private/Admin
export const getContentStats = async (req, res, next) => {
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

  successResponse({
    res,
    message: "Content statistics retrieved successfully",
    data: {
      overall: stats[0] || {},
      categories: categoryStats,
    },
  });
};
