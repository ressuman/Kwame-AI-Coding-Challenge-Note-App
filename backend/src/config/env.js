import "dotenv/config";

const env = (key, fallback) => process.env[key] ?? fallback;

export const config = {
  env: env("NODE_ENV", "development"),
  port: Number(env("PORT", 4000)),
  mongoUri: env("MONGODB_URI"),
  corsOrigin: env("CORS_ORIGIN", "*"),
};
