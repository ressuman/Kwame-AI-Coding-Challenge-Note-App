import { asyncHandler } from "../middlewares/asyncHandler.js";
import * as notes from "../services/note.service.js";
import { successResponse } from "../utils/response.js";

/* The `export const list` function is handling the endpoint for listing notes. Here's a breakdown of
what it does: */
export const list = asyncHandler(async (req, res) => {
  const { page = 1, limit = 50, sort = "-updatedAt" } = req.query;

  const result = await notes.listNotes({
    page: Number(page) || 1,
    limit: Math.min(Number(limit) || 50, 200),
    sort,
  });

  successResponse(res, "All notes fetched successfully", result, 200);
});

/* The `export const get` function is handling the endpoint for retrieving a specific note by its ID.
Here's a breakdown of what it does: */
export const get = asyncHandler(async (req, res) => {
  const item = await notes.getNote(req.params.id);

  if (!item) return successResponse(res, "Note not found", null, 404);

  successResponse(res, "Note fetched successfully", item, 200);
});

/* The `export const create` function is handling the endpoint for creating a new note. Here's a
breakdown of what it does: */
export const create = asyncHandler(async (req, res) => {
  const item = await notes.createNote(req.body);

  successResponse(res, "Note created successfully", item, 201);
});

// Supports autosave-as-you-type via PATCH on each keystroke/debounce
/* The `export const patch` function is handling the endpoint for updating a note. Here's a breakdown
of what it does: */
export const patch = asyncHandler(async (req, res) => {
  const item = await notes.updateNote(req.params.id, req.body);

  if (!item) return successResponse(res, "Note not found", null, 404);

  successResponse(res, "Note updated successfully", item, 200);
});

/* The `export const remove` function is handling the endpoint for deleting a note. Here's a breakdown
of what it does: */
export const remove = asyncHandler(async (req, res) => {
  const item = await notes.deleteNote(req.params.id);

  if (!item) return successResponse(res, "Note not found", null, 404);

  successResponse(res, "Note deleted successfully", null, 204);
});
