import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config/env.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import notesRouter from "./routes/note.routes.js";
import { reqId } from "./utils/logger.js";

const app = express();

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

// 404
app.use((req, res) =>
  res.status(404).json({ error: "Not Found", path: req.originalUrl })
);

// Error handler
app.use(errorHandler);

export default app;
