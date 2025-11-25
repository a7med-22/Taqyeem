import EducationalContent from "../../DB/models/educational-content.model.js";
import { successResponse } from "../../utils/index.js";
import { uploadFile, destroyFile } from "../../utils/multer/cloudinary.js";

// @desc    Get all educational content
// @route   GET /api/v1/learn
// @access  Public (or Private for admin)
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

  // If admin, show all content (published and unpublished)
  // Otherwise, only show published content
  let query = {};
  if (!req.user || req.user.role !== "admin") {
    query.isPublished = true;
  }

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
  // Parse JSON strings from FormData if needed
  const parseField = (field) => {
    if (!field) return field;
    if (typeof field === "string") {
      try {
        return JSON.parse(field);
      } catch {
        return field;
      }
    }
    return field;
  };

  const type = req.body.type;
  const title = parseField(req.body.title);
  const content = parseField(req.body.content);
  const category = req.body.category;
  const tags = parseField(req.body.tags) || [];
  const featured = req.body.featured === "true" || req.body.featured === true;
  const references = parseField(req.body.references) || [];
  const isPublished = req.body.isPublished === "true" || req.body.isPublished === true;

  // Handle image upload for articles
  let thumbnailUrl = null;
  if (type === "article" && req.file) {
    const uploadResult = await uploadFile({
      file: req.file,
      filePath: `educational-content/${req.user._id}`,
    });
    thumbnailUrl = uploadResult.secure_url;
  }

  const educationalContent = await EducationalContent.create({
    type,
    title,
    content,
    category,
    authorId: req.user._id,
    tags,
    featured,
    references,
    thumbnailUrl,
    isPublished,
    publishedAt: isPublished ? new Date() : null,
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
  // Parse JSON strings from FormData if needed
  const parseField = (field) => {
    if (!field && field !== false) return undefined;
    if (typeof field === "string") {
      try {
        return JSON.parse(field);
      } catch {
        return field;
      }
    }
    return field;
  };

  const educationalContent = await EducationalContent.findById(req.params.id);
  if (!educationalContent) {
    throw new Error("Educational content not found", { cause: 404 });
  }

  // Parse fields from FormData
  const title = parseField(req.body.title);
  const content = parseField(req.body.content);
  const category = req.body.category;
  const tags = parseField(req.body.tags);
  const featured = req.body.featured !== undefined 
    ? (req.body.featured === "true" || req.body.featured === true)
    : undefined;
  const references = parseField(req.body.references);
  const isPublished = req.body.isPublished !== undefined
    ? (req.body.isPublished === "true" || req.body.isPublished === true)
    : undefined;

  // Handle image upload for articles (if new image provided)
  let updateData = {};
  
  if (title !== undefined) updateData.title = title;
  if (content !== undefined) updateData.content = content;
  if (category !== undefined) updateData.category = category;
  if (tags !== undefined) updateData.tags = tags;
  if (featured !== undefined) updateData.featured = featured;
  if (references !== undefined) updateData.references = references;
  if (isPublished !== undefined) {
    updateData.isPublished = isPublished;
    updateData.publishedAt =
      isPublished && !educationalContent.isPublished
        ? new Date()
        : educationalContent.publishedAt;
  }

  if (req.file && educationalContent.type === "article") {
    const uploadResult = await uploadFile({
      file: req.file,
      filePath: `educational-content/${req.user._id}`,
    });
    updateData.thumbnailUrl = uploadResult.secure_url;
  }

  const updatedContent = await EducationalContent.findByIdAndUpdate(
    req.params.id,
    updateData,
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
