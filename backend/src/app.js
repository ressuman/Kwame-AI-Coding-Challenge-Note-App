import cors from "cors";
import express from "express";
//import "express-async-errors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config/env.js";
import { errorHandler } from "./middlewares/errorHandler.js";
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

// 404
app.use((req, res) =>
  res.status(404).json({ error: "NotFound", path: req.originalUrl })
);

// Error handler
app.use(errorHandler);

export default app;
