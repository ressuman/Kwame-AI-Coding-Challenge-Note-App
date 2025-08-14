import { Note } from "../models/note.model.js";

/**
 * The function `listNotes` retrieves a paginated list of notes sorted by updatedAt date in descending
 * order.
 * @param [] - The `listNotes` function is an asynchronous function that retrieves a list of notes from
 * a database. Here are the parameters and their default values:
 * @returns The `listNotes` function returns an object with the following properties:
 * - `items`: An array of notes retrieved from the database based on the specified page, limit, and
 * sort criteria.
 * - `total`: The total number of notes in the database.
 * - `page`: The current page number.
 * - `pages`: The total number of pages based on the total number of notes and the specified limit
 */
export async function listNotes({
  page = 1,
  limit = 50,
  sort = "-updatedAt",
} = {}) {
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Note.find()
      .collation({
        locale: "en",
        strength: 2,
      })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),
    Note.countDocuments(),
  ]);
  return {
    items,
    total,
    page,
    pages: Math.ceil(total / limit) || 1,
  };
}

/**
 * The function `getNote` retrieves a note by its ID in a MongoDB database and returns it in a lean
 * format.
 * @param id - The `id` parameter is the unique identifier of the note that you want to retrieve from
 * the database.
 * @returns The `getNote` function is returning a Promise that resolves to the result of querying the
 * database for a Note document with the specified `id`. The `lean()` method is used to return a plain
 * JavaScript object instead of a full Mongoose document.
 */
export async function getNote(id) {
  return Note.findById(id).lean();
}

/**
 * The function `createNote` creates a new note using the provided payload and returns it as an object.
 * @param payload - The `payload` parameter in the `createNote` function likely contains the data
 * needed to create a new note. This data could include information such as the title, content, author,
 * timestamp, or any other relevant details for the note being created.
 * @returns The `createNote` function is returning the newly created note object after it has been
 * saved to the database. The `toObject()` method is used to convert the Mongoose document to a plain
 * JavaScript object before returning it.
 */
export async function createNote(payload) {
  // Rely on unique index; let controller translate duplicate error nicely
  const note = await Note.create(payload);
  return note.toObject();
}

/**
 * The function `updateNote` updates a note document in a MongoDB database with the provided payload
 * and returns the updated note object.
 * @param id - The `id` parameter is the unique identifier of the note that you want to update in the
 * database.
 * @param payload - The `payload` parameter in the `updateNote` function refers to the data that you
 * want to update in the note document. It is an object containing the fields and values that you want
 * to set or modify in the note document identified by the `id`.
 * @returns The `updateNote` function returns the updated note object as a plain JavaScript object
 * (`toObject()` method is used for this conversion) if the update operation is successful. If there is
 * no updated note (for example, if the note with the specified `id` does not exist), it returns
 * `null`.
 */
export async function updateNote(id, payload) {
  const note = await Note.findByIdAndUpdate(
    id,
    {
      $set: payload,
    },
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  ).collation({
    locale: "en",
    strength: 2,
  });
  return note?.toObject() ?? null;
}

/**
 * The function `deleteNote` deletes a note from the database based on the provided `id`.
 * @param id - The `id` parameter in the `deleteNote` function is the unique identifier of the note
 * that you want to delete from the database. This identifier is used to locate and delete the specific
 * note record from the database.
 * @returns The `deleteNote` function is returning the result of calling
 * `Note.findByIdAndDelete(id).lean()`. This function is likely deleting a note from a database using
 * the provided `id` and returning the deleted note in a lean format.
 */
export async function deleteNote(id) {
  return Note.findByIdAndDelete(id).lean();
}
