/**
 * The function `reqId` generates a minimal request ID for logging purposes in JavaScript.
 * @param req - The `req` parameter in the code snippet refers to the request object in an Express.js
 * middleware function. It contains information about the HTTP request being made, such as headers,
 * parameters, body, etc. In this specific function, a unique request ID is generated and assigned to
 * `req.id` if
 * @param _res - The `_res` parameter in the code snippet you provided is typically used to represent
 * the response object in an Express middleware function. It is a convention to use `_res` as a
 * parameter name when you are not directly using the response object within the middleware function.
 * Instead, you are passing it along to
 * @param next - The `next` parameter in the code snippet is a function that is used to pass control to
 * the next middleware function in the stack. When called, it executes the next middleware function in
 * the application. It is a callback function that is typically called within a middleware function to
 * pass control to the next middleware
 */
export const reqId = (req, _res, next) => {
  // Minimal request id (good for logs)
  req.id = req.id || Math.random().toString(36).slice(2, 8);
  next();
};
