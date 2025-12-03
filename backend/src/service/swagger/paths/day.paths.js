/**
 * Day Endpoints
 * Interview day management endpoints
 */

/**
 * @swagger
 * /api/v1/days:
 *   get:
 *     tags: [Days]
 *     summary: Get all interview days (Public)
 *     description: Get list of all active interview days. This is a public endpoint.
 *     security: []
 *     responses:
 *       200:
 *         description: List of interview days
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
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date
 *                       title:
 *                         type: object
 *                         properties:
 *                           en:
 *                             type: string
 *                           ar:
 *                             type: string
 *                       description:
 *                         type: object
 *                         properties:
 *                           en:
 *                             type: string
 *                           ar:
 *                             type: string
 *                       isActive:
 *                         type: boolean
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *
 *   post:
 *     tags: [Days]
 *     summary: Create interview day (Admin only)
 *     description: Create a new interview day. Requires admin role.
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
 *               - title
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2024-12-25
 *               title:
 *                 type: object
 *                 required:
 *                   - en
 *                   - ar
 *                 properties:
 *                   en:
 *                     type: string
 *                     example: Interview Day
 *                   ar:
 *                     type: string
 *                     example: يوم المقابلة
 *               description:
 *                 type: object
 *                 properties:
 *                   en:
 *                     type: string
 *                   ar:
 *                     type: string
 *               isActive:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       201:
 *         description: Interview day created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden - Admin access required
 *
 * /api/v1/days/{id}:
 *   get:
 *     tags: [Days]
 *     summary: Get interview day by ID (Public)
 *     description: Get interview day information by ID. This is a public endpoint.
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Day ID
 *     responses:
 *       200:
 *         description: Interview day information
 *       404:
 *         description: Day not found
 *
 *   put:
 *     tags: [Days]
 *     summary: Update interview day (Admin only)
 *     description: Update interview day information. Requires admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Day ID
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
 *               title:
 *                 type: object
 *                 properties:
 *                   en:
 *                     type: string
 *                   ar:
 *                     type: string
 *               description:
 *                 type: object
 *                 properties:
 *                   en:
 *                     type: string
 *                   ar:
 *                     type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Interview day updated successfully
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Day not found
 *
 *   delete:
 *     tags: [Days]
 *     summary: Delete interview day (Admin only)
 *     description: Delete an interview day. Requires admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Day ID
 *     responses:
 *       200:
 *         description: Interview day deleted successfully
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Day not found
 */

export default {};

