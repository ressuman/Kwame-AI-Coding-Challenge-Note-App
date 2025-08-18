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

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const CSS_URL =
//   "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";

// Security & basics
// app.use(helmet());
// / Configure helmet with proper CSP for Swagger UI v5.0.1
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         styleSrc: ["'self'", "'unsafe-inline'", "blob:"],
//         scriptSrc: [
//           "'self'",
//           "'unsafe-inline'",
//           "'unsafe-eval'",
//           "blob:",
//           "https://vercel.live", // Allow Vercel's scripts
//         ],
//         imgSrc: ["'self'", "data:", "https:"],
//         fontSrc: ["'self'", "https:", "data:"],
//         connectSrc: ["'self'", "https:"],
//         objectSrc: ["'none'"],
//         mediaSrc: ["'self'"],
//         frameSrc: ["'none'"],
//       },
//     },
//   })
// );
// Configure helmet with relaxed CSP for Swagger UI to work properly
// app.use((req, res, next) => {
//   // Disable CSP completely for swagger docs to avoid conflicts
//   if (req.path.startsWith("/api/v1/api-docs")) {
//     return next();
//   }
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         styleSrc: ["'self'", "'unsafe-inline'", "blob:"],
//         scriptSrc: [
//           "'self'",
//           "'unsafe-inline'",
//           "'unsafe-eval'",
//           "blob:",
//           "https://vercel.live",
//         ],
//         imgSrc: ["'self'", "data:", "https:"],
//         fontSrc: ["'self'", "https:", "data:"],
//         connectSrc: ["'self'", "https:"],
//         objectSrc: ["'none'"],
//         mediaSrc: ["'self'"],
//         frameSrc: ["'none'"],
//       },
//     },
//   })(req, res, next);
// });
// Disable helmet for swagger routes, apply it selectively
app.use((req, res, next) => {
  if (req.path.startsWith("/api/v1/api-docs")) {
    // No security headers for swagger UI to avoid conflicts
    return next();
  }
  // Apply helmet to all other routes
  helmet()(req, res, next);
});
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json({ limit: "1mb" }));

// // Explicitly serve swagger-ui static files with correct MIME types
// app.use(
//   "/api/v1/api-docs",
//   express.static(path.join(__dirname, "../node_modules/swagger-ui-dist"), {
//     setHeaders: (res, filePath) => {
//       if (filePath.endsWith(".css")) {
//         res.setHeader("Content-Type", "text/css");
//       } else if (filePath.endsWith(".js")) {
//         res.setHeader("Content-Type", "application/javascript");
//       }
//     },
//   })
// );

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

// Disable CSP for Swagger UI routes only
// app.use("/api/v1/api-docs", (req, res, next) => {
//   res.removeHeader("Content-Security-Policy");
//   next();
// });

// Mount swagger ui at /api-docs
// app.use(
//   "/api/v1/api-docs",
//   swaggerUi.serve,
//   swaggerUi.setup(apiDocumentation, { explorer: true, customCssUrl: CSS_URL })
// );
// app.use(
//   "/api/v1/api-docs",
//   swaggerUi.serve,
//   swaggerUi.setup(apiDocumentation, {
//     explorer: true,
//     customSiteTitle: "Notes API Documentation",
//     swaggerOptions: {
//       persistAuthorization: true,
//       displayRequestDuration: true,
//       docExpansion: "none",
//       filter: true,
//       showExtensions: true,
//       showCommonExtensions: true,
//     },
//   })
// );

// Swagger UI setup with enhanced configuration for Vercel
const swaggerOptions = {
  explorer: true,
  customSiteTitle: "Notes API Documentation",
  customfavIcon: false,
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    docExpansion: "none",
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    tryItOutEnabled: true,
  },
  customCssUrl: null, // Use built-in CSS
  customJs: null, // Use built-in JS
};

// Mount swagger ui AFTER static file serving
// app.use("/api/v1/api-docs", swaggerUi.serve);

app.use(
  "/api/v1/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(apiDocumentation, swaggerOptions)
);

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Notes API backend 🎉",
    about:
      "This is a RESTful API for creating, listing, updating, and deleting notes.",
    author: {
      name: "Richard Essuman",
      github:
        "https://github.com/ressuman/Kwame-AI-Coding-Challenge-Note-App.git",
    },
    version: "1.0.0",
    documentation: "/api/v1/api-docs",
    routes: {
      apiRoot: "/api",
      notesBase: "/api/v1/notes",
      healthCheck: "/api/v1/health",
    },
  });
});

// // 404
// app.use((req, res) =>
//   res.status(404).json({
//     success: false,
//     error: "Not Found",
//     path: req.originalUrl,
//     message: `Route ${req.originalUrl} not found`,
//     availableRoutes: [
//       "GET /api",
//       "GET /api/v1/health",
//       "GET /api/v1/notes",
//       "GET /api/v1/notes/:id",
//       "POST /api/v1/notes",
//       "PATCH /api/v1/notes/:id",
//       "DELETE /api/v1/notes/:id",
//     ],
//   })
// );
// 404 - Make sure this doesn't interfere with swagger static files
// 404 - Make sure this doesn't interfere with swagger static files
app.use((req, res) => {
  // Don't send 404 for swagger static files
  if (
    req.path.includes("/api/v1/api-docs/") &&
    (req.path.endsWith(".css") ||
      req.path.endsWith(".js") ||
      req.path.endsWith(".png"))
  ) {
    return res.status(404).end();
  }

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
  });
});
// Error handler
app.use(errorHandler);

export default app;
