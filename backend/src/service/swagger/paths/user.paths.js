/**
 * User Endpoints
 * User management endpoints
 */

/**
 * @swagger
 * /api/v1/users/interviewers:
 *   get:
 *     tags: [Users]
 *     summary: Get all approved interviewers (Public)
 *     description: Get list of all approved interviewers. This is a public endpoint.
 *     security: []
 *     parameters:
 *       - in: query
 *         name: specialization
 *         schema:
 *           type: string
 *           enum: [frontend, backend, fullstack, mobile, devops, data-science, ai-ml, cybersecurity, qa, ui-ux]
 *         description: Filter by specialization
 *     responses:
 *       200:
 *         description: List of approved interviewers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *
 * /api/v1/users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users (Admin only)
 *     description: Get list of all users. Requires admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [candidate, interviewer, admin]
 *         description: Filter by role
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       403:
 *         description: Forbidden - Admin access required
 *
 * /api/v1/users/pending-interviewers:
 *   get:
 *     tags: [Users]
 *     summary: Get pending interviewers (Admin only)
 *     description: Get list of interviewers waiting for approval. Requires admin role.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pending interviewers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       403:
 *         description: Forbidden - Admin access required
 *
 * /api/v1/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by ID
 *     description: Get user information by ID. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *
 *   put:
 *     tags: [Users]
 *     summary: Update user (Admin only)
 *     description: Update user information. Requires admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *               email:
 *                 type: string
 *                 format: email
 *               role:
 *                 type: string
 *                 enum: [candidate, interviewer, admin]
 *               isActive:
 *                 type: boolean
 *               isApproved:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User updated successfully
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User not found
 *
 *   delete:
 *     tags: [Users]
 *     summary: Delete user (Admin only)
 *     description: Delete a user. Requires admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User not found
 *
 * /api/v1/users/me:
 *   put:
 *     tags: [Users]
 *     summary: Update own profile
 *     description: Update authenticated user's own profile
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
 *                 minLength: 2
 *                 maxLength: 50
 *               language:
 *                 type: string
 *                 enum: [en, ar]
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *
 * /api/v1/users/me/avatar:
 *   put:
 *     tags: [Users]
 *     summary: Update avatar
 *     description: Update authenticated user's avatar image
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Avatar image file (JPG, PNG, etc.)
 *     responses:
 *       200:
 *         description: Avatar updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *
 * /api/v1/users/me/deactivate:
 *   put:
 *     tags: [Users]
 *     summary: Deactivate own account
 *     description: Deactivate authenticated user's own account
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deactivated successfully
 *
 * /api/v1/users/{id}/approve:
 *   put:
 *     tags: [Users]
 *     summary: Approve interviewer (Admin only)
 *     description: Approve a pending interviewer. Requires admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Interviewer user ID
 *     responses:
 *       200:
 *         description: Interviewer approved successfully
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User not found
 *
 * /api/v1/users/{id}/reject:
 *   put:
 *     tags: [Users]
 *     summary: Reject interviewer (Admin only)
 *     description: Reject a pending interviewer. Requires admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Interviewer user ID
 *     responses:
 *       200:
 *         description: Interviewer rejected successfully
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User not found
 */

export default {};

