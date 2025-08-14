import mongoose from "mongoose";
import { config } from "./env.js";

export async function connectDB() {
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(config.mongoUri, {
      autoIndex: config.env !== "production",
    });

    // Ensure unique index with case-insensitive collation for title
    await mongoose.connection.db
      .command({
        collMod: "notes",
        validator: {},
      })
      .catch(() => {}); // ignore if collection doesn't exist yet

    // Create indexes after connect
    const { Note } = await import("../models/note.model.js");
    await Note.collection.createIndex(
      { title: 1 },
      { unique: true, collation: { locale: "en", strength: 2 } }
    );

    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}
