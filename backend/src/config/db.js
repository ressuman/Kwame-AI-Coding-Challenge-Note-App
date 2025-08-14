import mongoose from "mongoose";
import { config } from "./env.js";

// export async function connectDB() {
//   mongoose.set("strictQuery", true);

//   try {
//     await mongoose.connect(config.mongoUri, {
//       autoIndex: config.env !== "production",
//     });

//     // Ensure unique index with case-insensitive collation for title
//     await mongoose.connection.db
//       .command({
//         collMod: "notes",
//         validator: {},
//       })
//       .catch(() => {}); // ignore if collection doesn't exist yet

//     // Create indexes after connect
//     const { Note } = await import("../models/note.model.js");
//     await Note.collection.createIndex(
//       { title: 1 },
//       { unique: true, collation: { locale: "en", strength: 2 } }
//     );

//     console.log("✅ MongoDB connected");
//   } catch (err) {
//     console.error("❌ MongoDB connection error:", err.message);
//     process.exit(1);
//   }
// }

/**
 * The function `connectDB` connects to a MongoDB database using the provided configuration.
 */
export async function connectDB() {
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(config.mongoUri, {
      autoIndex: config.env !== "production",
    });

    console.log(
      `✅ MongoDB connected to database: ${mongoose.connection.name}`
    );

    // Ensure collection exists & indexes are correct
    const collections = await mongoose.connection.db
      .listCollections({ name: "Notes" })
      .toArray();
    if (collections.length === 0) {
      console.warn(
        "⚠ 'Notes' collection does not exist yet. It will be created on first insert."
      );
    } else {
      console.log("📂 'Notes' collection found.");
    }

    // Ensure index exists
    const { Note } = await import("../models/note.model.js");
    const indexes = await Note.collection.indexes();
    const hasTitleIndex = indexes.some(
      (idx) => idx.key && idx.key.title === 1 && idx.unique
    );

    if (!hasTitleIndex) {
      console.log("🔧 Creating unique, case-insensitive title index...");
      await Note.collection.createIndex(
        { title: 1 },
        { unique: true, collation: { locale: "en", strength: 2 } }
      );
      console.log("✅ Index created.");
    } else {
      console.log("✅ Unique title index already exists.");
    }
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}
