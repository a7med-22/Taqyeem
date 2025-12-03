/**
 * Auth Schemas
 * Authentication-related schema definitions
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           example: Ahmed Ali
 *         email:
 *           type: string
 *           format: email
 *           example: ahmed@example.com
 *         password:
 *           type: string
 *           minLength: 6
 *           example: password123
 *         role:
 *           type: string
 *           enum: [candidate, interviewer, admin]
 *           example: candidate
 *         language:
 *           type: string
 *           enum: [en, ar]
 *           default: en
 *           example: en
 *         yearsOfExperience:
 *           type: integer
 *           minimum: 0
 *           maximum: 50
 *           description: Required for interviewer role
 *           example: 5
 *         specialization:
 *           type: string
 *           enum: [frontend, backend, fullstack, mobile, devops, data-science, ai-ml, cybersecurity, qa, ui-ux]
 *           description: Required for interviewer role
 *           example: fullstack
 *         cv:
 *           type: string
 *           format: binary
 *           description: CV file (PDF/DOC/DOCX) - multipart/form-data
 *
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: ahmed@example.com
 *         password:
 *           type: string
 *           example: password123
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Login successful
 *         data:
 *           type: object
 *           properties:
 *             user:
 *               $ref: '#/components/schemas/User'
 *             token:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *         name:
 *           type: string
 *           example: Ahmed Ali
 *         email:
 *           type: string
 *           format: email
 *           example: ahmed@example.com
 *         role:
 *           type: string
 *           enum: [candidate, interviewer, admin]
 *           example: candidate
 *         avatarUrl:
 *           type: string
 *           nullable: true
 *           example: https://cloudinary.com/image.jpg
 *         cvUrl:
 *           type: string
 *           nullable: true
 *           example: https://cloudinary.com/cv.pdf
 *         yearsOfExperience:
 *           type: integer
 *           nullable: true
 *           example: 5
 *         specialization:
 *           type: string
 *           nullable: true
 *           example: fullstack
 *         isApproved:
 *           type: boolean
 *           example: true
 *         language:
 *           type: string
 *           enum: [en, ar]
 *           example: en
 *         isActive:
 *           type: boolean
 *           example: true
 *         lastLogin:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

export default {};

