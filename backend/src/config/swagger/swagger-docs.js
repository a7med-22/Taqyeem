/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: password123
 *
 *     CreateFeedbackRequest:
 *       type: object
 *       required:
 *         - sessionId
 *         - text
 *       properties:
 *         sessionId:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *         text:
 *           type: string
 *           maxLength: 2000
 *           example: Great interview experience
 *         feedbackType:
 *           type: string
 *           enum: [general, technical, behavioral, improvement]
 *           default: general
 *         isPublic:
 *           type: boolean
 *           default: false
 *         isAnonymous:
 *           type: boolean
 *           default: false
 *
 *     CreateInterviewQuestionRequest:
 *       type: object
 *       required:
 *         - specialization
 *         - question
 *       properties:
 *         specialization:
 *           type: string
 *           enum: [frontend, backend, fullstack, mobile, devops, data-science, ai-ml, cybersecurity, qa, ui-ux]
 *         question:
 *           type: object
 *           required:
 *             - en
 *             - ar
 *           properties:
 *             en:
 *               type: string
 *               maxLength: 500
 *             ar:
 *               type: string
 *               maxLength: 500
 *         category:
 *           type: string
 *           enum: [technical, behavioral, problem-solving, system-design]
 *           default: technical
 *         difficulty:
 *           type: string
 *           enum: [easy, medium, hard]
 *           default: medium
 *         suggestedAnswer:
 *           type: object
 *           properties:
 *             en:
 *               type: string
 *               maxLength: 1000
 *             ar:
 *               type: string
 *               maxLength: 1000
 *
 *     MarkQuestionAsAskedRequest:
 *       type: object
 *       required:
 *         - questionId
 *       properties:
 *         questionId:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *         notes:
 *           type: string
 *           maxLength: 500
 *
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *         password:
 *           type: string
 *           format: password
 *           minLength: 6
 *           example: password123
 *         role:
 *           type: string
 *           enum: [candidate, interviewer, admin]
 *           example: candidate
 *         specialization:
 *           type: string
 *           enum: [frontend, backend, fullstack, mobile, devops, data-science, ai-ml, cybersecurity, qa, ui-ux]
 *         yearsOfExperience:
 *           type: number
 *           minimum: 0
 *           maximum: 50
 *         cv:
 *           type: string
 *           format: binary
 *           description: CV file (required for interviewer role)
 *
 *     CreateEvaluationRequest:
 *       type: object
 *       required:
 *         - sessionId
 *         - criteria
 *       properties:
 *         sessionId:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *         criteria:
 *           type: object
 *           required:
 *             - communication
 *             - technical
 *             - problemSolving
 *             - confidence
 *           properties:
 *             communication:
 *               type: object
 *               properties:
 *                 score:
 *                   type: number
 *                   minimum: 0
 *                   maximum: 10
 *                 comment:
 *                   type: string
 *             technical:
 *               type: object
 *               properties:
 *                 score:
 *                   type: number
 *                   minimum: 0
 *                   maximum: 10
 *                 comment:
 *                   type: string
 *             problemSolving:
 *               type: object
 *               properties:
 *                 score:
 *                   type: number
 *                   minimum: 0
 *                   maximum: 10
 *                 comment:
 *                   type: string
 *             confidence:
 *               type: object
 *               properties:
 *                 score:
 *                   type: number
 *                   minimum: 0
 *                   maximum: 10
 *                 comment:
 *                   type: string
 *         notes:
 *           type: string
 */

// This file contains Swagger/OpenAPI schema definitions
// The actual endpoint documentation will be in JSDoc comments in controller files

export default {};

