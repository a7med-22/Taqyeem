/**
 * Learn Endpoints
 * Educational content management endpoints
 */

/**
 * @swagger
 * /api/v1/learn:
 *   get:
 *     tags: [Learn]
 *     summary: Get educational content (Public)
 *     description: Get list of published educational content. This is a public endpoint, but authenticated admins can see unpublished content.
 *     security: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [article, faq, tip]
 *         description: Filter by content type
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [frontend-development, backend-development, soft-skills, interview-preparation, career-development]
 *         description: Filter by category
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in title and content
 *     responses:
 *       200:
 *         description: List of educational content
 *
 *   post:
 *     tags: [Learn]
 *     summary: Create educational content (Admin only)
 *     description: Create new educational content. Supports both JSON and multipart/form-data. Requires admin role.
 *     security:
 *       - bearerAuth: []
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
 *                 required:
 *                   - en
 *                   - ar
 *                 properties:
 *                   en:
 *                     type: string
 *                     maxLength: 200
 *                   ar:
 *                     type: string
 *                     maxLength: 200
 *               content:
 *                 type: object
 *                 required:
 *                   - en
 *                   - ar
 *                 properties:
 *                   en:
 *                     type: string
 *                   ar:
 *                     type: string
 *               category:
 *                 type: string
 *                 enum: [frontend-development, backend-development, soft-skills, interview-preparation, career-development]
 *               thumbnailUrl:
 *                 type: string
 *               references:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *               recommendedVideos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               isPublished:
 *                 type: boolean
 *                 default: false
 *               featured:
 *                 type: boolean
 *                 default: false
 *         multipart/form-data:
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
 *               title:
 *                 type: string
 *                 description: 'JSON string with {"en": "...", "ar": "..."}'
 *               content:
 *                 type: string
 *                 description: 'JSON string with {"en": "...", "ar": "..."}'
 *               category:
 *                 type: string
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *               references:
 *                 type: string
 *                 description: JSON string array
 *               recommendedVideos:
 *                 type: string
 *                 description: JSON string array
 *               tags:
 *                 type: string
 *                 description: JSON string array
 *               isPublished:
 *                 type: boolean
 *               featured:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Educational content created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden - Admin access required
 *
 * /api/v1/learn/categories:
 *   get:
 *     tags: [Learn]
 *     summary: Get categories (Public)
 *     description: Get list of available content categories. This is a public endpoint.
 *     security: []
 *     responses:
 *       200:
 *         description: List of categories
 *
 * /api/v1/learn/stats:
 *   get:
 *     tags: [Learn]
 *     summary: Get content statistics (Admin only)
 *     description: Get statistics about educational content. Requires admin role.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Content statistics
 *       403:
 *         description: Forbidden - Admin access required
 *
 * /api/v1/learn/{id}:
 *   get:
 *     tags: [Learn]
 *     summary: Get educational content by ID (Public)
 *     description: Get educational content by ID. This is a public endpoint.
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Content ID
 *     responses:
 *       200:
 *         description: Educational content information
 *       404:
 *         description: Content not found
 *
 *   put:
 *     tags: [Learn]
 *     summary: Update educational content (Admin only)
 *     description: Update educational content. Supports both JSON and multipart/form-data. Requires admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Content ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               title:
 *                 type: object
 *               content:
 *                 type: object
 *               category:
 *                 type: string
 *               thumbnailUrl:
 *                 type: string
 *               references:
 *                 type: array
 *               recommendedVideos:
 *                 type: array
 *               tags:
 *                 type: array
 *               isPublished:
 *                 type: boolean
 *               featured:
 *                 type: boolean
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *               references:
 *                 type: string
 *               recommendedVideos:
 *                 type: string
 *               tags:
 *                 type: string
 *               isPublished:
 *                 type: boolean
 *               featured:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Educational content updated successfully
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Content not found
 *
 *   delete:
 *     tags: [Learn]
 *     summary: Delete educational content (Admin only)
 *     description: Delete educational content. Requires admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Content ID
 *     responses:
 *       200:
 *         description: Educational content deleted successfully
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Content not found
 *
 * /api/v1/learn/bulk:
 *   post:
 *     tags: [Learn]
 *     summary: Bulk create educational content (Admin only)
 *     description: Create multiple educational content items at once. Requires admin role.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - type
 *                     - title
 *                     - content
 *                     - category
 *                   properties:
 *                     type:
 *                       type: string
 *                     title:
 *                       type: object
 *                     content:
 *                       type: object
 *                     category:
 *                       type: string
 *     responses:
 *       201:
 *         description: Educational content items created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden - Admin access required
 */

export default {};

