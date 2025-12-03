/**
 * Admin Endpoints
 * Admin dashboard and management endpoints
 */

/**
 * @swagger
 * /api/v1/admin/dashboard:
 *   get:
 *     tags: [Admin]
 *     summary: Get dashboard statistics (Admin only)
 *     description: Get comprehensive dashboard statistics including users, sessions, reservations, etc. Requires admin role.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                         candidates:
 *                           type: integer
 *                         interviewers:
 *                           type: integer
 *                         admins:
 *                           type: integer
 *                     sessions:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                         scheduled:
 *                           type: integer
 *                         inProgress:
 *                           type: integer
 *                         completed:
 *                           type: integer
 *                         cancelled:
 *                           type: integer
 *                     reservations:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                         pending:
 *                           type: integer
 *                         accepted:
 *                           type: integer
 *                         rejected:
 *                           type: integer
 *       403:
 *         description: Forbidden - Admin access required
 *
 * /api/v1/admin/reservations:
 *   get:
 *     tags: [Admin]
 *     summary: Get all reservations (Admin only)
 *     description: Get all reservations in the system. Requires admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, accepted, rejected]
 *         description: Filter by status
 *     responses:
 *       200:
 *         description: List of all reservations
 *       403:
 *         description: Forbidden - Admin access required
 *
 * /api/v1/admin/reservations/{id}:
 *   delete:
 *     tags: [Admin]
 *     summary: Delete reservation (Admin only)
 *     description: Delete any reservation. Requires admin role.
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
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Reservation not found
 *
 * /api/v1/admin/slots:
 *   get:
 *     tags: [Admin]
 *     summary: Get all slots (Admin only)
 *     description: Get all slots in the system. Requires admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [available, pending, booked]
 *         description: Filter by status
 *     responses:
 *       200:
 *         description: List of all slots
 *       403:
 *         description: Forbidden - Admin access required
 *
 * /api/v1/admin/slots/{id}:
 *   delete:
 *     tags: [Admin]
 *     summary: Delete slot (Admin only)
 *     description: Delete any slot. Requires admin role.
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
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Slot not found
 *
 * /api/v1/admin/sessions:
 *   get:
 *     tags: [Admin]
 *     summary: Get all sessions (Admin only)
 *     description: Get all sessions in the system. Requires admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [scheduled, in-progress, completed, cancelled]
 *         description: Filter by status
 *     responses:
 *       200:
 *         description: List of all sessions
 *       403:
 *         description: Forbidden - Admin access required
 *
 * /api/v1/admin/sessions/{id}:
 *   delete:
 *     tags: [Admin]
 *     summary: Delete session (Admin only)
 *     description: Delete any session. Requires admin role.
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
 *         description: Session deleted successfully
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Session not found
 */

export default {};

