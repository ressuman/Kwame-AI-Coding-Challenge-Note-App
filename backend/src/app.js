import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { config } from "./config/env.js";
import { apiDocumentation } from "./docs/api.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import notesRouter from "./routes/note.routes.js";
import { reqId } from "./utils/logger.js";

const app = express();

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";

// Security & basics
app.use(helmet());
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json({ limit: "1mb" }));

// Logging
morgan.token("id", (req) => req.id);
app.use(reqId);
app.use(morgan(":id :method :url :status :response-time ms"));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Healthcheck
app.get("/api/v1/health", (_req, res) => res.json({ status: "ok" }));

// API routes
app.use("/api/v1/notes", notesRouter);

// Root endpoint
app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Notes API is running successfully! 🚀",
    version: "1.0.0",
    documentation: "/api/v1/api-docs",
    endpoints: {
      notes: "/api/v1/notes",
      health: "/api/v1/health",
    },
  });
});

// Mount swagger ui at /api-docs
app.use(
  "/api/v1/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(apiDocumentation, { explorer: true, customCssUrl: CSS_URL })
);

// 404
app.use((req, res) =>
  res.status(404).json({
    success: false,
    error: "Not Found",
    path: req.originalUrl,
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: [
      "GET /api",
      "GET /api/v1/health",
      "GET /api/v1/notes",
      "GET /api/v1/notes/:id",
      "POST /api/v1/notes",
      "PATCH /api/v1/notes/:id",
      "DELETE /api/v1/notes/:id",
    ],
  })
);

// Error handler
app.use(errorHandler);

export default app;
