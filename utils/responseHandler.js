import { ApiResponse } from "./api-response.js";

export const responseHandler = (res, statusCode, message, data = null) => {
  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, message, data));
};
