/**
 * Session Endpoints
 * Interview session management endpoints
 */

/**
 * @swagger
 * /api/v1/sessions/me:
 *   get:
 *     tags: [Sessions]
 *     summary: Get my sessions
 *     description: Get authenticated user's sessions (candidate or interviewer).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's sessions
 *
 * /api/v1/sessions/{id}:
 *   get:
 *     tags: [Sessions]
 *     summary: Get session by ID
 *     description: Get session information by ID. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID
 *     responses:
 *       200:
 *         description: Session information
 *       404:
 *         description: Session not found
 *
 * /api/v1/sessions/{id}/start:
 *   post:
 *     tags: [Sessions]
 *     summary: Start session (Interviewer/Admin only)
 *     description: Start an interview session. Requires interviewer or admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID
 *     responses:
 *       200:
 *         description: Session started successfully
 *       400:
 *         description: Session cannot be started (wrong status, etc.)
 *       403:
 *         description: Forbidden - Interviewer/Admin access required
 *       404:
 *         description: Session not found
 *
 * /api/v1/sessions/{id}/recording:
 *   post:
 *     tags: [Sessions]
 *     summary: Upload session recording (Interviewer/Admin only)
 *     description: Upload a recording for a session. Requires interviewer or admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - recording
 *             properties:
 *               recording:
 *                 type: string
 *                 format: binary
 *                 description: Recording file (video/audio)
 *     responses:
 *       200:
 *         description: Recording uploaded successfully
 *       403:
 *         description: Forbidden - Interviewer/Admin access required
 *       404:
 *         description: Session not found
 *
 * /api/v1/sessions/{id}/complete:
 *   post:
 *     tags: [Sessions]
 *     summary: Complete session (Interviewer/Admin only)
 *     description: Mark a session as completed. Requires interviewer or admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID
 *     responses:
 *       200:
 *         description: Session completed successfully
 *       400:
 *         description: Session cannot be completed (wrong status, etc.)
 *       403:
 *         description: Forbidden - Interviewer/Admin access required
 *       404:
 *         description: Session not found
 *
 * /api/v1/sessions/{id}/cancel:
 *   post:
 *     tags: [Sessions]
 *     summary: Cancel session
 *     description: Cancel a session. Can be done by candidate or interviewer.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cancelledReason:
 *                 type: string
 *                 maxLength: 500
 *                 example: Emergency came up
 *     responses:
 *       200:
 *         description: Session cancelled successfully
 *       400:
 *         description: Session cannot be cancelled (wrong status, etc.)
 *       404:
 *         description: Session not found
 */

export default {};

