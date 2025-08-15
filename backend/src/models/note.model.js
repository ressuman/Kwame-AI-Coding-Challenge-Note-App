import mongoose from "mongoose";
import { z } from "zod";

// Zod schema for validation before saving
export const noteValidationSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title must be at least 1 character long")
    .max(100, "Title cannot be more than 100 characters"),
  body: z
    .string()
    .trim()
    .min(1, "Body must be at least 1 character long")
    .max(10000, "Body cannot exceed 10,000 characters"),
});

/* This code snippet is defining a Mongoose schema for a "Note" model. Let's break it down: */
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: 1,
      maxlength: 100,
    },
    body: {
      type: String,
      required: [true, "Note body is required"],
      trim: true,
      minlength: 1,
      maxlength: 10000,
      default: "",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Case-insensitive unique title (index created in connectDB)
noteSchema.index(
  { title: 1 },
  {
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

// Explicit collection name — match DB exactly
export const Note = mongoose.model("Note", noteSchema, "notes");
