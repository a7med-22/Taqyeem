import Joi from "joi";
import { generalRules } from "../../utils/validation-rules.js";

// Joi schema for register validation
export const registerSchema = {
  body: Joi.object({
    name: generalRules.name.required(),
    email: generalRules.email.required(),
    password: generalRules.password.required(),
    role: generalRules.role.optional(),
    language: generalRules.language.optional(),
  }),
};

// Joi schema for login validation
export const loginSchema = {
  body: Joi.object({
    email: generalRules.email.required(),
    password: generalRules.passwordSimple.required(),
  }),
};
