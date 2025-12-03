import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Taqyeem Platform API",
      version: "1.0.0",
      description: "Comprehensive API documentation for Taqyeem - Bilingual Interview & Learning Platform",
      contact: {
        name: "Taqyeem Team",
        email: "support@taqyeem.com",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
      {
        url: "https://api.taqyeem.com",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT token",
        },
      },
      schemas: {
        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Error message",
            },
            errors: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Operation successful",
            },
            data: {
              type: "object",
            },
          },
        },
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "507f1f77bcf86cd799439011",
            },
            name: {
              type: "string",
              example: "John Doe",
            },
            email: {
              type: "string",
              example: "john@example.com",
            },
            role: {
              type: "string",
              enum: ["candidate", "interviewer", "admin"],
              example: "candidate",
            },
            avatarUrl: {
              type: "string",
              nullable: true,
              example: "https://cloudinary.com/image.jpg",
            },
            specialization: {
              type: "string",
              nullable: true,
              enum: [
                "frontend",
                "backend",
                "fullstack",
                "mobile",
                "devops",
                "data-science",
                "ai-ml",
                "cybersecurity",
                "qa",
                "ui-ux",
              ],
            },
            yearsOfExperience: {
              type: "number",
              nullable: true,
              example: 5,
            },
            isApproved: {
              type: "boolean",
              example: true,
            },
            language: {
              type: "string",
              enum: ["en", "ar"],
              example: "en",
            },
            isActive: {
              type: "boolean",
              example: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Session: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "507f1f77bcf86cd799439011",
            },
            candidateId: {
              $ref: "#/components/schemas/User",
            },
            interviewerId: {
              $ref: "#/components/schemas/User",
            },
            reservationId: {
              type: "string",
              example: "507f1f77bcf86cd799439011",
            },
            date: {
              type: "string",
              format: "date",
              example: "2024-12-31",
            },
            startTime: {
              type: "string",
              example: "10:00",
            },
            endTime: {
              type: "string",
              example: "11:00",
            },
            status: {
              type: "string",
              enum: ["scheduled", "in-progress", "completed", "cancelled"],
              example: "scheduled",
            },
            recordingUrl: {
              type: "string",
              nullable: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Evaluation: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "507f1f77bcf86cd799439011",
            },
            sessionId: {
              type: "string",
              example: "507f1f77bcf86cd799439011",
            },
            candidateId: {
              type: "string",
              example: "507f1f77bcf86cd799439011",
            },
            interviewerId: {
              type: "string",
              example: "507f1f77bcf86cd799439011",
            },
            criteria: {
              type: "object",
              properties: {
                communication: {
                  type: "object",
                  properties: {
                    score: {
                      type: "number",
                      minimum: 0,
                      maximum: 10,
                      example: 8,
                    },
                    comment: {
                      type: "string",
                      example: "Good communication skills",
                    },
                  },
                },
                technical: {
                  type: "object",
                  properties: {
                    score: {
                      type: "number",
                      minimum: 0,
                      maximum: 10,
                      example: 7,
                    },
                    comment: {
                      type: "string",
                      example: "Solid technical knowledge",
                    },
                  },
                },
                problemSolving: {
                  type: "object",
                  properties: {
                    score: {
                      type: "number",
                      minimum: 0,
                      maximum: 10,
                      example: 9,
                    },
                    comment: {
                      type: "string",
                      example: "Excellent problem-solving approach",
                    },
                  },
                },
                confidence: {
                  type: "object",
                  properties: {
                    score: {
                      type: "number",
                      minimum: 0,
                      maximum: 10,
                      example: 8,
                    },
                    comment: {
                      type: "string",
                      example: "Confident presentation",
                    },
                  },
                },
              },
            },
            overallScore: {
              type: "number",
              example: 8,
            },
            notes: {
              type: "string",
              example: "Overall good performance",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Feedback: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "507f1f77bcf86cd799439011",
            },
            sessionId: {
              type: "string",
              example: "507f1f77bcf86cd799439011",
            },
            text: {
              type: "string",
              example: "Great interview experience",
            },
            feedbackType: {
              type: "string",
              enum: ["general", "technical", "behavioral", "improvement"],
              example: "general",
            },
            isPublic: {
              type: "boolean",
              example: false,
            },
            isAnonymous: {
              type: "boolean",
              example: false,
            },
            createdBy: {
              $ref: "#/components/schemas/User",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        InterviewQuestion: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "507f1f77bcf86cd799439011",
            },
            specialization: {
              type: "string",
              enum: [
                "frontend",
                "backend",
                "fullstack",
                "mobile",
                "devops",
                "data-science",
                "ai-ml",
                "cybersecurity",
                "qa",
                "ui-ux",
              ],
              example: "frontend",
            },
            question: {
              type: "object",
              properties: {
                en: {
                  type: "string",
                  example: "What is React?",
                },
                ar: {
                  type: "string",
                  example: "ما هو React؟",
                },
              },
            },
            category: {
              type: "string",
              enum: ["technical", "behavioral", "problem-solving", "system-design"],
              example: "technical",
            },
            difficulty: {
              type: "string",
              enum: ["easy", "medium", "hard"],
              example: "medium",
            },
            suggestedAnswer: {
              type: "object",
              properties: {
                en: {
                  type: "string",
                },
                ar: {
                  type: "string",
                },
              },
            },
            isActive: {
              type: "boolean",
              example: true,
            },
          },
        },
      },
      responses: {
        BadRequest: {
          description: "Bad request - validation error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        Unauthorized: {
          description: "Unauthorized - authentication required",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        Forbidden: {
          description: "Forbidden - insufficient permissions",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        NotFound: {
          description: "Resource not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
    tags: [
      {
        name: "Authentication",
        description: "User authentication and registration",
      },
      {
        name: "Users",
        description: "User management operations",
      },
      {
        name: "Days",
        description: "Interview day management",
      },
      {
        name: "Schedules",
        description: "Interview schedule management",
      },
      {
        name: "Slots",
        description: "Time slot management",
      },
      {
        name: "Reservations",
        description: "Reservation management",
      },
      {
        name: "Sessions",
        description: "Interview session management",
      },
      {
        name: "Evaluations",
        description: "Evaluation and assessment management",
      },
      {
        name: "Feedback",
        description: "Session feedback management",
      },
      {
        name: "Interview Questions",
        description: "Interview question management",
      },
      {
        name: "Learning",
        description: "Educational content management",
      },
      {
        name: "Admin",
        description: "Admin dashboard and management",
      },
    ],
  },
  apis: [
    "./src/modules/**/*.controller.js",
    "./src/app.controller.js",
    "./src/config/swagger.paths.js",
    "./src/config/swagger-docs.js",
    "./src/config/swagger.complete.js",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

