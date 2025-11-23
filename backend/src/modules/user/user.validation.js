import { body } from "express-validator";

export const validateUserUpdate = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("language")
    .optional()
    .isIn(["en", "ar"])
    .withMessage("Language must be en or ar"),
];
