import Joi from "joi";
import { generalRules } from "../../utils/validation-rules.js";

// Schema for creating an evaluation
export const createEvaluationSchema = {
  body: Joi.object({
    sessionId: generalRules.mongoId("Session ID").required(),
    technicalSkills: generalRules.rating("Technical skills rating").required(),
    communicationSkills: generalRules
      .rating("Communication skills rating")
      .required(),
    problemSolving: generalRules.rating("Problem solving rating").required(),
    overallRating: generalRules.rating("Overall rating").required(),
    strengths: generalRules.text("Strengths", 1, 1000).optional(),
    areasForImprovement: generalRules
      .text("Areas for improvement", 1, 1000)
      .optional(),
    additionalNotes: generalRules.text("Additional notes", 1, 1000).optional(),
  }),
};

// Schema for updating an evaluation
export const updateEvaluationSchema = {
  params: generalRules.paramsWithId("Evaluation ID"),
  body: Joi.object({
    technicalSkills: generalRules.rating("Technical skills rating").optional(),
    communicationSkills: generalRules
      .rating("Communication skills rating")
      .optional(),
    problemSolving: generalRules.rating("Problem solving rating").optional(),
    overallRating: generalRules.rating("Overall rating").optional(),
    strengths: generalRules.text("Strengths", 1, 1000).optional(),
    areasForImprovement: generalRules
      .text("Areas for improvement", 1, 1000)
      .optional(),
    additionalNotes: generalRules.text("Additional notes", 1, 1000).optional(),
  }),
};

// Schema for getting evaluation by session ID
export const getEvaluationBySessionSchema = {
  params: generalRules.paramsWithSessionId,
};
