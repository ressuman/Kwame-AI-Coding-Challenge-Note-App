/**
 * The function `successResponse` sends a successful response with a message, data, and status code in
 * a JSON format.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client in an Express.js application.
 * @param message - The `message` parameter is a string that represents a message or description of the
 * response being sent back to the client. It is typically used to provide information about the
 * outcome of the request or any relevant details.
 * @param [data] - The `data` parameter in the `successResponse` function is an optional parameter that
 * allows you to pass additional data along with the success response. This data can be any information
 * that you want to include in the response, such as the result of a successful operation, user
 * details, or any other relevant
 * @param [statusCode=200] - The `statusCode` parameter in the `successResponse` function is used to
 * specify the HTTP status code that will be returned in the response. By default, it is set to 200
 * (OK), but you can override it by providing a different status code when calling the function.
 * @returns The `successResponse` function is returning a JSON response with a status code, message,
 * and data object. The status code defaults to 200 if not provided.
 */
export function successResponse(res, message, data = {}, statusCode = 200) {
  return res.status(statusCode).json({
    status: true,
    message,
    data,
  });
}

/**
 * The function `errorResponse` generates a JSON response with a specified error message and status
 * code.
 * @param res - The `res` parameter is the response object that is used to send a response back to the
 * client in an Express.js application. It is typically provided by the Express framework and contains
 * methods for sending responses, such as `res.status()` and `res.json()`.
 * @param message - The `message` parameter in the `errorResponse` function is a string that represents
 * the error message or description that you want to send back in the response when an error occurs.
 * @param [statusCode=500] - The `statusCode` parameter in the `errorResponse` function is used to
 * specify the HTTP status code that will be returned in the response. By default, it is set to 500
 * (Internal Server Error) if not provided when calling the function. This parameter allows the caller
 * to customize the status code
 * @returns The `errorResponse` function returns a JSON response with a status code, a status of false,
 * and a message.
 */
export function errorResponse(res, message, statusCode = 500) {
  return res.status(statusCode).json({
    status: false,
    message,
  });
}
