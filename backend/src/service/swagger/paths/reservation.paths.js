/**
 * Reservation Endpoints
 * Reservation management endpoints
 */

/**
 * @swagger
 * /api/v1/reservations:
 *   post:
 *     tags: [Reservations]
 *     summary: Create reservation (Candidate only)
 *     description: Create a new reservation for a slot. Requires candidate role.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - slotId
 *             properties:
 *               slotId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               note:
 *                 type: string
 *                 maxLength: 500
 *                 example: Looking forward to the interview
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *       400:
 *         description: Validation error or slot not available
 *       403:
 *         description: Forbidden - Candidate access required
 *
 * /api/v1/reservations/me:
 *   get:
 *     tags: [Reservations]
 *     summary: Get my reservations
 *     description: Get authenticated user's reservations (candidate or interviewer).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's reservations
 *
 * /api/v1/reservations/pending:
 *   get:
 *     tags: [Reservations]
 *     summary: Get pending reservations (Interviewer/Admin only)
 *     description: Get all pending reservations for the authenticated interviewer. Requires interviewer or admin role.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pending reservations
 *       403:
 *         description: Forbidden - Interviewer/Admin access required
 *
 * /api/v1/reservations/{id}/accept:
 *   post:
 *     tags: [Reservations]
 *     summary: Accept reservation (Interviewer/Admin only)
 *     description: Accept a pending reservation. Requires interviewer or admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     responses:
 *       200:
 *         description: Reservation accepted successfully
 *       403:
 *         description: Forbidden - Interviewer/Admin access required
 *       404:
 *         description: Reservation not found
 *
 * /api/v1/reservations/{id}/reject:
 *   post:
 *     tags: [Reservations]
 *     summary: Reject reservation (Interviewer/Admin only)
 *     description: Reject a pending reservation. Requires interviewer or admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rejectionReason:
 *                 type: string
 *                 maxLength: 500
 *                 example: Slot already full
 *     responses:
 *       200:
 *         description: Reservation rejected successfully
 *       403:
 *         description: Forbidden - Interviewer/Admin access required
 *       404:
 *         description: Reservation not found
 *
 * /api/v1/reservations/{id}:
 *   delete:
 *     tags: [Reservations]
 *     summary: Delete reservation (Candidate/Interviewer only)
 *     description: Delete a reservation. Requires candidate or interviewer role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     responses:
 *       200:
 *         description: Reservation deleted successfully
 *       403:
 *         description: Forbidden - Candidate/Interviewer access required
 *       404:
 *         description: Reservation not found
 */

export default {};

