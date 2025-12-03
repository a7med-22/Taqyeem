/**
 * Interview Question Endpoints
 * Interview question management endpoints
 */

/**
 * @swagger
 * /api/v1/interview-questions/{specialization}:
 *   get:
 *     tags: [Interview Questions]
 *     summary: Get questions by specialization
 *     description: Get interview questions for a specific specialization. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: specialization
 *         required: true
 *         schema:
 *           type: string
 *           enum: [frontend, backend, fullstack, mobile, devops, data-science, ai-ml, cybersecurity, qa, ui-ux]
 *         description: Specialization
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [technical, behavioral, problem-solving, system-design]
 *         description: Filter by category
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [easy, medium, hard]
 *         description: Filter by difficulty
 *     responses:
 *       200:
 *         description: List of questions for the specialization
 *
 * /api/v1/interview-questions/session/{sessionId}:
 *   get:
 *     tags: [Interview Questions]
 *     summary: Get session questions
 *     description: Get questions asked in a specific session. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID
 *     responses:
 *       200:
 *         description: List of questions for the session
 *
 * /api/v1/interview-questions:
 *   post:
 *     tags: [Interview Questions]
 *     summary: Create question (Interviewer/Admin only)
 *     description: Create a new interview question. Requires interviewer or admin role.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - specialization
 *               - question
 *             properties:
 *               specialization:
 *                 type: string
 *                 enum: [frontend, backend, fullstack, mobile, devops, data-science, ai-ml, cybersecurity, qa, ui-ux]
 *                 example: fullstack
 *               question:
 *                 type: object
 *                 required:
 *                   - en
 *                   - ar
 *                 properties:
 *                   en:
 *                     type: string
 *                     maxLength: 500
 *                     example: Explain the difference between REST and GraphQL
 *                   ar:
 *                     type: string
 *                     maxLength: 500
 *                     example: اشرح الفرق بين REST و GraphQL
 *               category:
 *                 type: string
 *                 enum: [technical, behavioral, problem-solving, system-design]
 *                 default: technical
 *               difficulty:
 *                 type: string
 *                 enum: [easy, medium, hard]
 *                 default: medium
 *               suggestedAnswer:
 *                 type: object
 *                 properties:
 *                   en:
 *                     type: string
 *                     maxLength: 1000
 *                   ar:
 *                     type: string
 *                     maxLength: 1000
 *     responses:
 *       201:
 *         description: Question created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden - Interviewer/Admin access required
 *
 * /api/v1/interview-questions/session/{sessionId}/ask:
 *   post:
 *     tags: [Interview Questions]
 *     summary: Mark question as asked (Interviewer/Admin only)
 *     description: Mark a question as asked in a session. Requires interviewer or admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - questionId
 *             properties:
 *               questionId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *     responses:
 *       201:
 *         description: Question marked as asked successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden - Interviewer/Admin access required
 */

export default {};

