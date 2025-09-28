import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TMTC Backend API",
      version: "1.0.0",
      description: "API documentation for TMTC backend",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", example: "John Doe" },
            email: { type: "string", example: "john@example.com" },
            password: { type: "string", example: "secret123" },
          },
        },
        Itinerary: {
          type: "object",
          required: ["title", "destination", "startDate", "endDate"],
          properties: {
            title: { type: "string", example: "Trip to Paris" },
            destination: { type: "string", example: "Paris" },
            startDate: {
              type: "string",
              format: "date",
              example: "2025-10-01",
            },
            endDate: { type: "string", format: "date", example: "2025-10-10" },
            activities: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  time: { type: "string", example: "09:00 AM" },
                  description: { type: "string", example: "Visit Louvre" },
                  location: { type: "string", example: "Louvre Museum" },
                },
              },
            },
          },
        },
      },
    },
    servers: [
      {
        url: "/api",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

export const specs = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  console.log("Swagger docs available at http://localhost:5000/api-docs");
};
