import Joi from "joi";
import { generalRules } from "../../utils/validation-rules.js";

// Schema for creating educational content
export const createEducationalContentSchema = {
  body: Joi.object({
    title: generalRules.bilingual("title").required(),
    description: generalRules.bilingual("description").required(),
    content: generalRules.bilingual("content").required(),
    category: Joi.string().required().messages({
      "string.empty": "Category is required",
      "any.required": "Category is required",
    }),
    difficulty: generalRules.difficulty.required(),
    tags: generalRules.stringArray.optional(),
    isPublished: generalRules.boolean.optional(),
  }),
};

// Schema for updating educational content
export const updateEducationalContentSchema = {
  params: generalRules.paramsWithId("Content ID"),
  body: Joi.object({
    title: generalRules.bilingual("title").optional(),
    description: generalRules.bilingual("description").optional(),
    content: generalRules.bilingual("content").optional(),
    category: Joi.string().optional(),
    difficulty: generalRules.difficulty.optional(),
    tags: generalRules.stringArray.optional(),
    isPublished: generalRules.boolean.optional(),
  }),
};

// Schema for content ID in params
export const contentIdSchema = {
  params: generalRules.paramsWithId("Content ID"),
};
