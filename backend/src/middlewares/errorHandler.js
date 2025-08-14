// Centralized error translator
/**
 * The function `errorHandler` handles different types of errors that may occur in a Node.js
 * application, such as duplicate key errors, invalid ObjectId errors, and validation errors, returning
 * appropriate responses for each case.
 * @param err - The `err` parameter in the `errorHandler` function is the error object that is passed
 * to the function when an error occurs in the application. This error object contains information
 * about the error that occurred, such as the error code, name, and details specific to the type of
 * error. The function
 * @param req - The `req` parameter in the `errorHandler` function stands for the request object. It
 * contains information about the HTTP request that triggered the error, such as headers, parameters,
 * body, and more. This object is provided by Express.js and is used to access details of the incoming
 * HTTP request.
 * @param res - The `res` parameter in the `errorHandler` function is the response object in
 * Express.js. It is used to send a response back to the client making the request. In the function, we
 * use `res.status(code)` to set the HTTP status code of the response and `res.json(data
 * @param _next - The `_next` parameter in the `errorHandler` function is a reference to the next
 * middleware function in the application's request-response cycle. It is used in Express.js middleware
 * functions to pass control to the next middleware function in the stack. If an error occurs and you
 * want to skip the current middleware
 * @returns The `errorHandler` function returns different JSON responses based on the type of error
 * encountered:
 */
export function errorHandler(err, req, res, _next) {
  // Mongoose duplicate key
  if (err?.code === 11000) {
    const fields = Object.keys(err.keyValue || {});
    return res.status(409).json({
      error: "DuplicateError",
      message: `${fields.join(", ")} must be unique`,
      fields: err.keyValue,
    });
  }

  // Mongoose invalid ObjectId
  if (err?.name === "CastError") {
    return res.status(400).json({
      error: "BadRequest",
      message: `Invalid id format`,
    });
  }

  // Mongoose validation
  if (err?.name === "ValidationError") {
    return res.status(400).json({
      error: "ValidationError",
      details: Object.values(err.errors).map((e) => ({
        path: e.path,
        message: e.message,
      })),
    });
  }

  console.error("UnhandledError:", err);
  return res.status(500).json({ error: "InternalServerError" });
}
