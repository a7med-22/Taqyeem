/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Register a new user (candidate, interviewer, or admin). Interviewers require CV upload.
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 example: password123
 *               role:
 *                 type: string
 *                 enum: [candidate, interviewer, admin]
 *                 example: candidate
 *               specialization:
 *                 type: string
 *                 enum: [frontend, backend, fullstack, mobile, devops, data-science, ai-ml, cybersecurity, qa, ui-ux]
 *                 description: Required for interviewer role
 *               yearsOfExperience:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 50
 *                 description: Required for interviewer role
 *               cv:
 *                 type: string
 *                 format: binary
 *                 description: CV file (required for interviewer role)
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       409:
 *         description: Email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login user
 *     description: Authenticate user and receive JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Get current user
 *     description: Get authenticated user's profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/v1/feedbacks:
 *   post:
 *     tags:
 *       - Feedback
 *     summary: Create feedback
 *     description: Create feedback for a session (candidate or interviewer)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateFeedbackRequest'
 *     responses:
 *       201:
 *         description: Feedback created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     feedback:
 *                       $ref: '#/components/schemas/Feedback'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/feedbacks/public:
 *   get:
 *     tags:
 *       - Feedback
 *     summary: Get public feedbacks
 *     description: Get all public feedbacks (no authentication required)
 *     parameters:
 *       - in: query
 *         name: feedbackType
 *         schema:
 *           type: string
 *           enum: [general, technical, behavioral, improvement]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Public feedbacks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     feedbacks:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Feedback'
 *                     pagination:
 *                       type: object
 */

/**
 * @swagger
 * /api/v1/feedbacks/my:
 *   get:
 *     tags:
 *       - Feedback
 *     summary: Get my feedbacks
 *     description: Get all feedbacks created by the authenticated user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: feedbackType
 *         schema:
 *           type: string
 *           enum: [general, technical, behavioral, improvement]
 *       - in: query
 *         name: isPublic
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Feedbacks retrieved successfully
 */

/**
 * @swagger
 * /api/v1/feedbacks/{sessionId}:
 *   get:
 *     tags:
 *       - Feedback
 *     summary: Get feedbacks by session
 *     description: Get all feedbacks for a specific session (must be candidate, interviewer, or admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Feedbacks retrieved successfully
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/feedbacks/{id}:
 *   put:
 *     tags:
 *       - Feedback
 *     summary: Update feedback
 *     description: Update own feedback
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 maxLength: 2000
 *               feedbackType:
 *                 type: string
 *                 enum: [general, technical, behavioral, improvement]
 *               isPublic:
 *                 type: boolean
 *               isAnonymous:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Feedback updated successfully
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     tags:
 *       - Feedback
 *     summary: Delete feedback
 *     description: Delete own feedback (or admin can delete any)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Feedback deleted successfully
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/interview-questions/{specialization}:
 *   get:
 *     tags:
 *       - Interview Questions
 *     summary: Get questions by specialization
 *     description: Get all active interview questions for a specific specialization
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: specialization
 *         required: true
 *         schema:
 *           type: string
 *           enum: [frontend, backend, fullstack, mobile, devops, data-science, ai-ml, cybersecurity, qa, ui-ux]
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [technical, behavioral, problem-solving, system-design]
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [easy, medium, hard]
 *     responses:
 *       200:
 *         description: Questions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     questions:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/InterviewQuestion'
 */

/**
 * @swagger
 * /api/v1/interview-questions/session/{sessionId}:
 *   get:
 *     tags:
 *       - Interview Questions
 *     summary: Get session questions
 *     description: Get all questions asked in a specific session
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session questions retrieved successfully
 */

/**
 * @swagger
 * /api/v1/interview-questions/session/{sessionId}/ask:
 *   post:
 *     tags:
 *       - Interview Questions
 *     summary: Mark question as asked
 *     description: Mark a question as asked during a session (interviewer only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MarkQuestionAsAskedRequest'
 *     responses:
 *       201:
 *         description: Question marked as asked
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/v1/interview-questions:
 *   post:
 *     tags:
 *       - Interview Questions
 *     summary: Create custom question
 *     description: Create a custom interview question (interviewer only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateInterviewQuestionRequest'
 *     responses:
 *       201:
 *         description: Question created successfully
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

// This file contains Swagger path definitions
// Add more endpoint documentation here or in controller files with JSDoc comments

export default {};

