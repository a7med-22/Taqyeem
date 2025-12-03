/**
 * Complete Swagger API Documentation for Taqyeem Platform
 * This file contains comprehensive endpoint documentation for all API routes
 */

/**
 * @swagger
 * /api/v1/users/interviewers:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all approved interviewers
 *     description: Get list of all approved interviewers with schedules (public endpoint)
 *     parameters:
 *       - in: query
 *         name: specialization
 *         schema:
 *           type: string
 *           enum: [frontend, backend, fullstack, mobile, devops, data-science, ai-ml, cybersecurity, qa, ui-ux]
 *     responses:
 *       200:
 *         description: Interviewers retrieved successfully
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
 *                     interviewers:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     description: Get all users with filtering and pagination (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [candidate, interviewer, admin]
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/v1/users/pending-interviewers:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get pending interviewers
 *     description: Get list of interviewers waiting for approval (admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pending interviewers retrieved successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/v1/users/me:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get current user profile
 *     description: Get authenticated user's profile information
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/v1/users/me:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update current user profile
 *     description: Update authenticated user's profile information
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               language:
 *                 type: string
 *                 enum: [en, ar]
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/v1/users/me/avatar:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update user avatar
 *     description: Upload and update user avatar image
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar updated successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/v1/users/me/deactivate:
 *   put:
 *     tags:
 *       - Users
 *     summary: Deactivate account
 *     description: Deactivate current user's account
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deactivated successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by ID
 *     description: Get user information by ID
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
 *         description: User retrieved successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/users/{id}/approve:
 *   put:
 *     tags:
 *       - Users
 *     summary: Approve interviewer
 *     description: Approve pending interviewer registration (admin only)
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
 *         description: Interviewer approved successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/users/{id}/reject:
 *   put:
 *     tags:
 *       - Users
 *     summary: Reject interviewer
 *     description: Reject pending interviewer registration (admin only)
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
 *         description: Interviewer rejected successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update user
 *     description: Update user information (admin only)
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
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [candidate, interviewer, admin]
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete user
 *     description: Delete user from system (admin only)
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
 *         description: User deleted successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/days:
 *   get:
 *     tags:
 *       - Days
 *     summary: Get all interview days
 *     description: Get list of all interview days (public endpoint)
 *     responses:
 *       200:
 *         description: Days retrieved successfully
 */

/**
 * @swagger
 * /api/v1/days/{id}:
 *   get:
 *     tags:
 *       - Days
 *     summary: Get day by ID
 *     description: Get interview day information by ID (public endpoint)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Day retrieved successfully
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/days:
 *   post:
 *     tags:
 *       - Days
 *     summary: Create interview day
 *     description: Create a new interview day (admin only)
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
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Day created successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/v1/days/{id}:
 *   put:
 *     tags:
 *       - Days
 *     summary: Update interview day
 *     description: Update interview day information (admin only)
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
 *               date:
 *                 type: string
 *                 format: date
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Day updated successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/days/{id}:
 *   delete:
 *     tags:
 *       - Days
 *     summary: Delete interview day
 *     description: Delete interview day (admin only)
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
 *         description: Day deleted successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/schedules:
 *   get:
 *     tags:
 *       - Schedules
 *     summary: Get all schedules
 *     description: Get list of all interview schedules (public endpoint)
 *     parameters:
 *       - in: query
 *         name: interviewerId
 *         schema:
 *           type: string
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Schedules retrieved successfully
 */

/**
 * @swagger
 * /api/v1/schedules/date/{date}:
 *   get:
 *     tags:
 *       - Schedules
 *     summary: Get schedules by date
 *     description: Get all schedules for a specific date (public endpoint)
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Schedules retrieved successfully
 */

/**
 * @swagger
 * /api/v1/schedules/my:
 *   get:
 *     tags:
 *       - Schedules
 *     summary: Get my schedules
 *     description: Get schedules created by authenticated interviewer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Schedules retrieved successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/v1/schedules/{id}:
 *   get:
 *     tags:
 *       - Schedules
 *     summary: Get schedule by ID
 *     description: Get interview schedule information by ID (public endpoint)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Schedule retrieved successfully
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/schedules:
 *   post:
 *     tags:
 *       - Schedules
 *     summary: Create interview schedule
 *     description: Create a new interview schedule (interviewer/admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - date
 *               - startTime
 *               - endTime
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               startTime:
 *                 type: string
 *               endTime:
 *                 type: string
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/v1/schedules/{id}:
 *   put:
 *     tags:
 *       - Schedules
 *     summary: Update interview schedule
 *     description: Update interview schedule information (interviewer/admin only)
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               startTime:
 *                 type: string
 *               endTime:
 *                 type: string
 *     responses:
 *       200:
 *         description: Schedule updated successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/schedules/{id}/image:
 *   put:
 *     tags:
 *       - Schedules
 *     summary: Upload schedule image
 *     description: Upload image for schedule (interviewer/admin only)
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/schedules/{id}:
 *   delete:
 *     tags:
 *       - Schedules
 *     summary: Delete interview schedule
 *     description: Delete interview schedule (interviewer/admin only)
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
 *         description: Schedule deleted successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/slots/interviewer/{interviewerId}:
 *   get:
 *     tags:
 *       - Slots
 *     summary: Get slots by interviewer
 *     description: Get all slots for a specific interviewer (public endpoint)
 *     parameters:
 *       - in: path
 *         name: interviewerId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Slots retrieved successfully
 */

/**
 * @swagger
 * /api/v1/slots/{dayId}:
 *   get:
 *     tags:
 *       - Slots
 *     summary: Get slots by day
 *     description: Get all slots for a specific interview day (public endpoint)
 *     parameters:
 *       - in: path
 *         name: dayId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Slots retrieved successfully
 */

/**
 * @swagger
 * /api/v1/slots/my:
 *   get:
 *     tags:
 *       - Slots
 *     summary: Get my slots
 *     description: Get all slots created by authenticated interviewer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Slots retrieved successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/v1/slots:
 *   post:
 *     tags:
 *       - Slots
 *     summary: Create time slot(s)
 *     description: Create one or more time slots (interviewer/admin only)
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
 *               - slots
 *             properties:
 *               scheduleId:
 *                 type: string
 *               slots:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - startTime
 *                     - endTime
 *                   properties:
 *                     startTime:
 *                       type: string
 *                     endTime:
 *                       type: string
 *                     maxCandidates:
 *                       type: integer
 *                       default: 1
 *     responses:
 *       201:
 *         description: Slot(s) created successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/v1/slots/{id}:
 *   put:
 *     tags:
 *       - Slots
 *     summary: Update time slot
 *     description: Update time slot information (interviewer/admin only)
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
 *               startTime:
 *                 type: string
 *               endTime:
 *                 type: string
 *               maxCandidates:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Slot updated successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/slots/{id}:
 *   delete:
 *     tags:
 *       - Slots
 *     summary: Delete time slot
 *     description: Delete time slot (interviewer/admin only)
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
 *         description: Slot deleted successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/reservations:
 *   post:
 *     tags:
 *       - Reservations
 *     summary: Create reservation
 *     description: Create a new reservation for an interview slot (candidate only)
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
 *               note:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/v1/reservations/me:
 *   get:
 *     tags:
 *       - Reservations
 *     summary: Get my reservations
 *     description: Get all reservations for authenticated user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, accepted, rejected]
 *     responses:
 *       200:
 *         description: Reservations retrieved successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/v1/reservations/pending:
 *   get:
 *     tags:
 *       - Reservations
 *     summary: Get pending reservations
 *     description: Get all pending reservation requests for authenticated interviewer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pending reservations retrieved successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/v1/reservations/{id}/accept:
 *   post:
 *     tags:
 *       - Reservations
 *     summary: Accept reservation
 *     description: Accept a pending reservation request (interviewer/admin only)
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
 *         description: Reservation accepted successfully, session created
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/reservations/{id}/reject:
 *   post:
 *     tags:
 *       - Reservations
 *     summary: Reject reservation
 *     description: Reject a pending reservation request with reason (interviewer/admin only)
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
 *               rejectionReason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reservation rejected successfully, slot restored
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/reservations/{id}:
 *   delete:
 *     tags:
 *       - Reservations
 *     summary: Delete reservation
 *     description: Delete reservation (candidate or interviewer can delete their own)
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
 *         description: Reservation deleted successfully, slot restored
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/sessions/me:
 *   get:
 *     tags:
 *       - Sessions
 *     summary: Get my sessions
 *     description: Get all sessions for authenticated user (candidate or interviewer)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [scheduled, in-progress, completed, cancelled]
 *     responses:
 *       200:
 *         description: Sessions retrieved successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/v1/sessions/{id}:
 *   get:
 *     tags:
 *       - Sessions
 *     summary: Get session by ID
 *     description: Get session information by ID (candidate, interviewer, or admin)
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
 *         description: Session retrieved successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/sessions/{id}/start:
 *   post:
 *     tags:
 *       - Sessions
 *     summary: Start session
 *     description: Start an interview session (interviewer/admin only)
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
 *         description: Session started successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/sessions/{id}/recording:
 *   post:
 *     tags:
 *       - Sessions
 *     summary: Upload session recording
 *     description: Upload recording file for a session (interviewer/admin only)
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               recording:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Recording uploaded successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/sessions/{id}/complete:
 *   post:
 *     tags:
 *       - Sessions
 *     summary: Complete session
 *     description: Complete an interview session (interviewer/admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Session completed successfully, slot restored
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/sessions/{id}/cancel:
 *   post:
 *     tags:
 *       - Sessions
 *     summary: Cancel session
 *     description: Cancel a session (candidate or interviewer can cancel)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cancelledReason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Session cancelled successfully, slot restored
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/evaluations:
 *   post:
 *     tags:
 *       - Evaluations
 *     summary: Create evaluation
 *     description: Create evaluation for a completed session (interviewer/admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEvaluationRequest'
 *     responses:
 *       201:
 *         description: Evaluation created successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/evaluations/my:
 *   get:
 *     tags:
 *       - Evaluations
 *     summary: Get my evaluations
 *     description: Get all evaluations created by authenticated interviewer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Evaluations retrieved successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/v1/evaluations/stats:
 *   get:
 *     tags:
 *       - Evaluations
 *     summary: Get evaluation statistics
 *     description: Get platform-wide evaluation statistics (admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/v1/evaluations/{sessionId}:
 *   get:
 *     tags:
 *       - Evaluations
 *     summary: Get evaluation by session
 *     description: Get evaluation for a specific session (candidate, interviewer, or admin)
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
 *         description: Evaluation retrieved successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/evaluations/{id}:
 *   put:
 *     tags:
 *       - Evaluations
 *     summary: Update evaluation
 *     description: Update evaluation information (interviewer/admin only)
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
 *               criteria:
 *                 type: object
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Evaluation updated successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/learn:
 *   get:
 *     tags:
 *       - Learning
 *     summary: Get educational content
 *     description: Get all educational content with filtering (public endpoint)
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [article, faq, tip]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Content retrieved successfully
 */

/**
 * @swagger
 * /api/v1/learn/categories:
 *   get:
 *     tags:
 *       - Learning
 *     summary: Get content categories
 *     description: Get list of all content categories (public endpoint)
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 */

/**
 * @swagger
 * /api/v1/learn/{id}:
 *   get:
 *     tags:
 *       - Learning
 *     summary: Get content by ID
 *     description: Get educational content by ID (public endpoint)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Content retrieved successfully
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/learn:
 *   post:
 *     tags:
 *       - Learning
 *     summary: Create educational content
 *     description: Create new educational content (admin only, supports JSON or FormData)
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - title
 *               - content
 *               - category
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [article, faq, tip]
 *               title:
 *                 type: object
 *                 properties:
 *                   en:
 *                     type: string
 *                   ar:
 *                     type: string
 *               content:
 *                 type: object
 *                 properties:
 *                   en:
 *                     type: string
 *                   ar:
 *                     type: string
 *               category:
 *                 type: string
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Content created successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/v1/learn/bulk:
 *   post:
 *     tags:
 *       - Learning
 *     summary: Bulk create educational content
 *     description: Create multiple educational content items at once (admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contents
 *             properties:
 *               contents:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       201:
 *         description: Content items created successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/v1/learn/{id}:
 *   put:
 *     tags:
 *       - Learning
 *     summary: Update educational content
 *     description: Update educational content (admin only, supports JSON or FormData)
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Content updated successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/learn/{id}:
 *   delete:
 *     tags:
 *       - Learning
 *     summary: Delete educational content
 *     description: Delete educational content (admin only)
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
 *         description: Content deleted successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/learn/stats:
 *   get:
 *     tags:
 *       - Learning
 *     summary: Get content statistics
 *     description: Get statistics about educational content (admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/v1/admin/dashboard:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get admin dashboard
 *     description: Get comprehensive dashboard statistics and analytics (admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
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
 *                     stats:
 *                       type: object
 *                       properties:
 *                         users:
 *                           type: object
 *                         reservations:
 *                           type: object
 *                         sessions:
 *                           type: object
 *                         evaluations:
 *                           type: object
 *                     trends:
 *                       type: object
 *                     recent:
 *                       type: object
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/v1/admin/reservations:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get all reservations
 *     description: Get all reservations with filtering and search (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, accepted, rejected]
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: interviewerId
 *         schema:
 *           type: string
 *       - in: query
 *         name: candidateId
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Reservations retrieved successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/v1/admin/reservations/{id}:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Delete reservation
 *     description: Delete any reservation (admin only, reverses slot booking)
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
 *         description: Reservation deleted successfully, slot restored
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/admin/slots:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get all slots
 *     description: Get all slots with filtering and search (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [available, pending, booked]
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: interviewerId
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Slots retrieved successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/v1/admin/slots/{id}:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Delete slot
 *     description: Delete any slot (admin only)
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
 *         description: Slot deleted successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/v1/admin/sessions:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get all sessions
 *     description: Get all sessions with filtering and search (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [scheduled, in-progress, completed, cancelled]
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: interviewerId
 *         schema:
 *           type: string
 *       - in: query
 *         name: candidateId
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Sessions retrieved successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/v1/admin/sessions/{id}:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Delete session
 *     description: Delete any session (admin only, reverses slot booking)
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
 *         description: Session deleted successfully, slot restored
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

// Complete API documentation for Taqyeem Platform
export default {};

