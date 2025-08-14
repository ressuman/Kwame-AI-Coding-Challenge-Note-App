import { ZodError } from "zod";

/**
 * The `validate` function is a middleware in JavaScript that uses a schema to parse and validate
 * request data, returning a 400 error response with validation details if errors occur.
 * @param schema - The `schema` parameter in the `validate` function is used to define the structure
 * and validation rules for the data that is expected in the request body. It is typically created
 * using a library like Zod, which provides a way to define schemas for data validation and parsing. In
 * the code snippet you
 * @param [source=body] - The `source` parameter in the `validate` function is used to specify the
 * location from which the data should be retrieved for validation. By default, it is set to "body",
 * indicating that the data to be validated is expected to be found in the request body. However, this
 * parameter allows flexibility
 * @returns The `validate` function is being returned, which takes a schema and an optional source
 * parameter as arguments. It then returns a middleware function that can be used to validate the
 * request body against the provided schema. If the validation fails, it will return a 400 status with
 * a JSON response containing details of the validation errors.
 */
export const validate =
  (schema, source = "body") =>
  (req, res, next) => {
    try {
      req[source] = schema.parse(req[source]);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          error: "ValidationError",
          details: err.errors.map((e) => ({
            path: e.path.join("."),
            message: e.message,
          })),
        });
      }
      next(err);
    }
  };
