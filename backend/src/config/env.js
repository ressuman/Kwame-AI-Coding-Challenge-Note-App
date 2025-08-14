import "dotenv/config";

/**
 * Get an environment variable or throw if missing and no fallback provided.
 */
const env = (key, fallback) => {
  const value = process.env[key];
  if (value === undefined || value === null || value === "") {
    if (fallback !== undefined) return fallback;
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

/**
 * Safely parse a number from env.
 */
const envNumber = (key, fallback) => {
  const value = env(key, fallback);
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new Error(`Environment variable ${key} must be a valid number`);
  }
  return parsed;
};

/* The code snippet is defining an object named `config` that contains various properties initialized
using the `env` and `envNumber` functions. Here's what each property is doing: */
export const config = {
  env: env("NODE_ENV", "development"),
  // port: Number(env("PORT", 4000)),
  port: envNumber("PORT", 4000),
  mongoUri: env("MONGODB_URI"),
  corsOrigin: env("CORS_ORIGIN", "*"),
};
