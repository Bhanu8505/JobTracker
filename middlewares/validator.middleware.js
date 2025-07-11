import { validationResult } from "express-validator";
import { ApiError } from "../utils/api-error.js";

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  // console.log(errors);

  const extractedErrors = [];
  errors.array().map((err) =>
    extractedErrors.push({
      [err.path]: err.msg,
    })
  );
  // console.log(extractedErrors);
  throw new ApiError(422, "Received data is not valid", extractedErrors);
};

export { validate };
