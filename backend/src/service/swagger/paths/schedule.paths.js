/**
 * Schedule Endpoints
 * Interview schedule management endpoints
 */

/**
 * @swagger
 * /api/v1/schedules:
 *   get:
 *     tags: [Schedules]
 *     summary: Get all schedules (Public)
 *     description: Get list of all active schedules. This is a public endpoint.
 *     security: []
 *     parameters:
 *       - in: query
 *         name: interviewerId
 *         schema:
 *           type: string
 *         description: Filter by interviewer ID
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by date
 *     responses:
 *       200:
 *         description: List of schedules
 *
 *   post:
 *     tags: [Schedules]
 *     summary: Create schedule (Interviewer/Admin only)
 *     description: Create a new interview schedule. Requires interviewer or admin role.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - startTime
 *               - endTime
 *               - duration
 *               - title
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2024-12-25
 *               startTime:
 *                 type: string
 *                 pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'
 *                 example: "09:00"
 *               endTime:
 *                 type: string
 *                 pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'
 *                 example: "17:00"
 *               duration:
 *                 type: integer
 *                 minimum: 15
 *                 maximum: 180
 *                 example: 30
 *               breakTime:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 60
 *                 default: 15
 *                 example: 15
 *               title:
 *                 type: string
 *                 maxLength: 100
 *                 example: Morning Interview Schedule
 *               description:
 *                 type: string
 *                 maxLength: 500
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden - Interviewer/Admin access required
 *
 * /api/v1/schedules/my:
 *   get:
 *     tags: [Schedules]
 *     summary: Get my schedules (Interviewer/Admin only)
 *     description: Get authenticated interviewer's schedules. Requires interviewer or admin role.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's schedules
 *       403:
 *         description: Forbidden - Interviewer/Admin access required
 *
 * /api/v1/schedules/date/{date}:
 *   get:
 *     tags: [Schedules]
 *     summary: Get schedules by date (Public)
 *     description: Get all schedules for a specific date. This is a public endpoint.
 *     security: []
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Date in YYYY-MM-DD format
 *         example: 2024-12-25
 *     responses:
 *       200:
 *         description: List of schedules for the date
 *
 * /api/v1/schedules/{id}:
 *   get:
 *     tags: [Schedules]
 *     summary: Get schedule by ID (Public)
 *     description: Get schedule information by ID. This is a public endpoint.
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Schedule ID
 *     responses:
 *       200:
 *         description: Schedule information
 *       404:
 *         description: Schedule not found
 *
 *   put:
 *     tags: [Schedules]
 *     summary: Update schedule (Interviewer/Admin only)
 *     description: Update schedule information. Requires interviewer or admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Schedule ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               startTime:
 *                 type: string
 *                 pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'
 *               endTime:
 *                 type: string
 *                 pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'
 *               duration:
 *                 type: integer
 *               breakTime:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Schedule updated successfully
 *       403:
 *         description: Forbidden - Interviewer/Admin access required
 *       404:
 *         description: Schedule not found
 *
 *   delete:
 *     tags: [Schedules]
 *     summary: Delete schedule (Interviewer/Admin only)
 *     description: Delete a schedule. Requires interviewer or admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Schedule ID
 *     responses:
 *       200:
 *         description: Schedule deleted successfully
 *       403:
 *         description: Forbidden - Interviewer/Admin access required
 *       404:
 *         description: Schedule not found
 *
 * /api/v1/schedules/{id}/image:
 *   put:
 *     tags: [Schedules]
 *     summary: Upload schedule image (Interviewer/Admin only)
 *     description: Upload an image for a schedule. Requires interviewer or admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Schedule ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file (JPG, PNG, etc.)
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       403:
 *         description: Forbidden - Interviewer/Admin access required
 *       404:
 *         description: Schedule not found
 */

export default {};

