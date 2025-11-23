import Joi from "joi";
import { generalRules } from "../../utils/validation-rules.js";

// Schema for updating user profile
export const updateProfileSchema = {
  body: Joi.object({
    name: generalRules.name.optional(),
    language: generalRules.language.optional(),
  }),
};

// Schema for getting user by ID
export const getUserByIdSchema = {
  params: generalRules.paramsWithId("User ID"),
};
