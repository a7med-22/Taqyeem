/**
 * Swagger/OpenAPI Configuration
 * Main configuration for API documentation
 */

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Taqyeem API",
    version: "1.0.0",
    description: "🌟 Bilingual Interview & Learning Platform API Documentation\n\n" +
      "Taqyeem is a comprehensive platform for interview scheduling, conduct, and evaluation " +
      "with educational content to help users improve their interview skills.\n\n" +
      "## Features\n" +
      "- JWT-based authentication with role-based access control\n" +
      "- Interview management (days, slots, reservations, sessions)\n" +
      "- Comprehensive evaluation system\n" +
      "- Educational content (articles, FAQs, tips)\n" +
      "- Real-time video interview sessions\n" +
      "- Bilingual support (Arabic/English)\n\n" +
      "## Authentication\n" +
      "Most endpoints require authentication. Use the `/api/v1/auth/login` endpoint to get a JWT token, " +
      "then include it in the Authorization header as: `Bearer <token>`\n\n" +
      "## Roles\n" +
      "- **Candidate**: Can book slots, view sessions, submit feedback\n" +
      "- **Interviewer**: Can create schedules, manage slots, conduct sessions, create evaluations\n" +
      "- **Admin**: Full access to all endpoints",
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
      url: process.env.NODE_ENV === "production" 
        ? (process.env.API_URL || (process.env.VERCEL_URL 
          ? `https://${process.env.VERCEL_URL}`
          : "https://your-production-url.com"))
        : `http://${process.env.HOST || "localhost"}:${process.env.PORT || 5000}`,
      description: process.env.NODE_ENV === "production" ? "Production Server" : "Local Development Server",
    },
  ],
  tags: [
    { name: "Auth", description: "Authentication endpoints" },
    { name: "Users", description: "User management endpoints" },
    { name: "Days", description: "Interview day management" },
    { name: "Schedules", description: "Interview schedule management" },
    { name: "Slots", description: "Time slot management" },
    { name: "Reservations", description: "Reservation management" },
    { name: "Sessions", description: "Interview session management" },
    { name: "Evaluations", description: "Evaluation management" },
    { name: "Feedback", description: "Feedback management" },
    { name: "Interview Questions", description: "Interview question management" },
    { name: "Learn", description: "Educational content management" },
    { name: "Admin", description: "Admin dashboard and management" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "JWT token obtained from /api/v1/auth/login endpoint",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const swaggerOptions = {
  definition: swaggerDefinition,
  apis: [
    "./src/service/swagger/paths/*.js",
    "./src/service/swagger/schemas/*.js",
  ],
};

export { swaggerDefinition, swaggerOptions };

