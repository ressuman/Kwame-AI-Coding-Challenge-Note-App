import mongoose from "mongoose";
import { config } from "./env.js";

/**
 * The function `connectDB` connects to a MongoDB database using the provided configuration.
 */
export async function connectDB() {
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(
      config.mongoUri,
      //{ autoIndex: true }
      {
        autoIndex: config.env !== "production",
      }
    );

    console.log(
      `✅ MongoDB connected to database: ${mongoose.connection.name}`
    );
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}
