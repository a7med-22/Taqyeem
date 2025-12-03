/**
 * Swagger Setup
 * Initialize and configure Swagger UI for API documentation
 */

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./swagger.config.js";

/**
 * Setup Swagger documentation
 * @param {Express} app - Express application instance
 */
export const setupSwagger = (app) => {
  // Generate Swagger specification from JSDoc comments
  const swaggerSpec = swaggerJsdoc(swaggerOptions);

  // Swagger UI options
  const swaggerUiOptions = {
    customCss: `
      .swagger-ui .topbar { display: none; }
      .swagger-ui .info { margin: 20px 0; }
      .swagger-ui .info .title { color: #3b82f6; }
    `,
    customSiteTitle: "Taqyeem API Documentation",
    customfavIcon: "/favicon.ico",
    swaggerOptions: {
      persistAuthorization: true, // Persist authorization token in browser
      displayRequestDuration: true,
      filter: true, // Enable filter/search
      tryItOutEnabled: true,
      supportedSubmitMethods: ["get", "post", "put", "delete", "patch"],
    },
  };

  // Serve Swagger JSON
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  // Serve Swagger UI
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, swaggerUiOptions)
  );

  const baseUrl = process.env.NODE_ENV === "production" 
    ? (process.env.API_URL || process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : "https://your-domain.com")
    : `http://${process.env.HOST || "localhost"}:${process.env.PORT || 5000}`;
  
  console.log("📚 Swagger documentation available at:");
  console.log(`   - UI: ${baseUrl}/api-docs`);
  console.log(`   - JSON: ${baseUrl}/api-docs.json`);
};

export default setupSwagger;

