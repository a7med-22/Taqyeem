/**
 * Slot Endpoints
 * Time slot management endpoints
 */

/**
 * @swagger
 * /api/v1/slots/interviewer/{interviewerId}:
 *   get:
 *     tags: [Slots]
 *     summary: Get slots by interviewer (Public)
 *     description: Get all slots for a specific interviewer. This is a public endpoint.
 *     security: []
 *     parameters:
 *       - in: path
 *         name: interviewerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Interviewer user ID
 *     responses:
 *       200:
 *         description: List of slots for the interviewer
 *
 * /api/v1/slots/{dayId}:
 *   get:
 *     tags: [Slots]
 *     summary: Get slots by day (Public)
 *     description: Get all slots for a specific day. This is a public endpoint.
 *     security: []
 *     parameters:
 *       - in: path
 *         name: dayId
 *         required: true
 *         schema:
 *           type: string
 *         description: Day ID
 *     responses:
 *       200:
 *         description: List of slots for the day
 *
 * /api/v1/slots:
 *   post:
 *     tags: [Slots]
 *     summary: Create slot (Interviewer/Admin only)
 *     description: Create a new time slot. Requires interviewer or admin role.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - scheduleId
 *               - date
 *               - startTime
 *               - endTime
 *             properties:
 *               scheduleId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
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
 *                 example: "09:30"
 *               maxCandidates:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 10
 *                 default: 1
 *                 example: 1
 *               notes:
 *                 type: string
 *                 maxLength: 500
 *     responses:
 *       201:
 *         description: Slot created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden - Interviewer/Admin access required
 *
 * /api/v1/slots/my:
 *   get:
 *     tags: [Slots]
 *     summary: Get my slots (Interviewer/Admin only)
 *     description: Get authenticated interviewer's slots. Requires interviewer or admin role.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's slots
 *       403:
 *         description: Forbidden - Interviewer/Admin access required
 *
 * /api/v1/slots/{id}:
 *   put:
 *     tags: [Slots]
 *     summary: Update slot (Interviewer/Admin only)
 *     description: Update slot information. Requires interviewer or admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Slot ID
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
 *               maxCandidates:
 *                 type: integer
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Slot updated successfully
 *       403:
 *         description: Forbidden - Interviewer/Admin access required
 *       404:
 *         description: Slot not found
 *
 *   delete:
 *     tags: [Slots]
 *     summary: Delete slot (Interviewer/Admin only)
 *     description: Delete a slot. Requires interviewer or admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Slot ID
 *     responses:
 *       200:
 *         description: Slot deleted successfully
 *       403:
 *         description: Forbidden - Interviewer/Admin access required
 *       404:
 *         description: Slot not found
 */

export default {};

