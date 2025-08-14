import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [1, "Title must be at least 1 character long"],
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    body: {
      type: String,
      required: [true, "Note body is required"],
      trim: true,
      minlength: [1, "Body must be at least 1 character long"],
      maxlength: [10000, "Body cannot exceed 10,000 characters"],
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

export const Note = mongoose.model("Note", noteSchema, "notes");
