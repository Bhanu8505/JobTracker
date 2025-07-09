import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-error.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token || "";
    if (!token) {
      throw new ApiError(400, "Invalid Token");
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decodedData);
    req.user = decodedData;
  } catch (error) {
    next(error);
  }
  next();
};
