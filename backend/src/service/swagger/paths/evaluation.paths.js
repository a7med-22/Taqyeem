/**
 * Evaluation Endpoints
 * Evaluation management endpoints
 */

/**
 * @swagger
 * /api/v1/evaluations/my:
 *   get:
 *     tags: [Evaluations]
 *     summary: Get my evaluations
 *     description: Get authenticated user's evaluations (as candidate or interviewer).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's evaluations
 *
 * /api/v1/evaluations/stats:
 *   get:
 *     tags: [Evaluations]
 *     summary: Get evaluation statistics (Admin only)
 *     description: Get evaluation statistics. Requires admin role.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Evaluation statistics
 *       403:
 *         description: Forbidden - Admin access required
 *
 * /api/v1/evaluations:
 *   post:
 *     tags: [Evaluations]
 *     summary: Create evaluation (Interviewer/Admin only)
 *     description: Create a new evaluation for a session. Requires interviewer or admin role.
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
 *               - criteria
 *               - overallScore
 *             properties:
 *               sessionId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               criteria:
 *                 type: object
 *                 required:
 *                   - communication
 *                   - technical
 *                   - problemSolving
 *                   - confidence
 *                 properties:
 *                   communication:
 *                     type: object
 *                     required:
 *                       - score
 *                     properties:
 *                       score:
 *                         type: integer
 *                         minimum: 1
 *                         maximum: 10
 *                         example: 8
 *                       comment:
 *                         type: string
 *                         maxLength: 500
 *                   technical:
 *                     type: object
 *                     required:
 *                       - score
 *                     properties:
 *                       score:
 *                         type: integer
 *                         minimum: 1
 *                         maximum: 10
 *                       comment:
 *                         type: string
 *                         maxLength: 500
 *                   problemSolving:
 *                     type: object
 *                     required:
 *                       - score
 *                     properties:
 *                       score:
 *                         type: integer
 *                         minimum: 1
 *                         maximum: 10
 *                       comment:
 *                         type: string
 *                         maxLength: 500
 *                   confidence:
 *                     type: object
 *                     required:
 *                       - score
 *                     properties:
 *                       score:
 *                         type: integer
 *                         minimum: 1
 *                         maximum: 10
 *                       comment:
 *                         type: string
 *                         maxLength: 500
 *               overallScore:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 10
 *                 description: Auto-calculated if not provided
 *                 example: 8
 *               notes:
 *                 type: string
 *                 maxLength: 1000
 *     responses:
 *       201:
 *         description: Evaluation created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden - Interviewer/Admin access required
 *
 * /api/v1/evaluations/{sessionId}:
 *   get:
 *     tags: [Evaluations]
 *     summary: Get evaluation by session ID
 *     description: Get evaluation for a specific session. Requires authentication.
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
 *         description: Evaluation information
 *       404:
 *         description: Evaluation not found
 *
 *   put:
 *     tags: [Evaluations]
 *     summary: Update evaluation (Interviewer/Admin only)
 *     description: Update an evaluation. Requires interviewer or admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Evaluation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               criteria:
 *                 type: object
 *                 properties:
 *                   communication:
 *                     type: object
 *                     properties:
 *                       score:
 *                         type: integer
 *                         minimum: 1
 *                         maximum: 10
 *                       comment:
 *                         type: string
 *                   technical:
 *                     type: object
 *                     properties:
 *                       score:
 *                         type: integer
 *                       comment:
 *                         type: string
 *                   problemSolving:
 *                     type: object
 *                     properties:
 *                       score:
 *                         type: integer
 *                       comment:
 *                         type: string
 *                   confidence:
 *                     type: object
 *                     properties:
 *                       score:
 *                         type: integer
 *                       comment:
 *                         type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Evaluation updated successfully
 *       403:
 *         description: Forbidden - Interviewer/Admin access required
 *       404:
 *         description: Evaluation not found
 */

export default {};

