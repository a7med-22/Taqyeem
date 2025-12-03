/**
 * Feedback Endpoints
 * Feedback management endpoints
 */

/**
 * @swagger
 * /api/v1/feedbacks/public:
 *   get:
 *     tags: [Feedback]
 *     summary: Get public feedbacks (Public)
 *     description: Get list of public feedbacks. This is a public endpoint.
 *     security: []
 *     responses:
 *       200:
 *         description: List of public feedbacks
 *
 * /api/v1/feedbacks:
 *   post:
 *     tags: [Feedback]
 *     summary: Create feedback
 *     description: Create a new feedback for a session. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sessionId
 *               - text
 *             properties:
 *               sessionId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               text:
 *                 type: string
 *                 maxLength: 2000
 *                 example: Great interview experience!
 *               feedbackType:
 *                 type: string
 *                 enum: [general, technical, behavioral, improvement]
 *                 default: general
 *               isPublic:
 *                 type: boolean
 *                 default: false
 *               isAnonymous:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       201:
 *         description: Feedback created successfully
 *       400:
 *         description: Validation error
 *
 * /api/v1/feedbacks/my:
 *   get:
 *     tags: [Feedback]
 *     summary: Get my feedbacks
 *     description: Get authenticated user's feedbacks.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's feedbacks
 *
 * /api/v1/feedbacks/{sessionId}:
 *   get:
 *     tags: [Feedback]
 *     summary: Get feedbacks by session ID
 *     description: Get all feedbacks for a specific session. Requires authentication.
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
 *         description: List of feedbacks for the session
 *
 * /api/v1/feedbacks/{id}:
 *   put:
 *     tags: [Feedback]
 *     summary: Update feedback
 *     description: Update a feedback. Only the creator can update their feedback.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Feedback ID
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
 *         description: Forbidden - Only creator can update
 *       404:
 *         description: Feedback not found
 *
 *   delete:
 *     tags: [Feedback]
 *     summary: Delete feedback
 *     description: Delete a feedback. Only the creator can delete their feedback.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Feedback ID
 *     responses:
 *       200:
 *         description: Feedback deleted successfully
 *       403:
 *         description: Forbidden - Only creator can delete
 *       404:
 *         description: Feedback not found
 */

export default {};

