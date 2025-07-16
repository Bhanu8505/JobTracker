import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-error.js";
import { User } from "../models/User.model.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token || "";
    if (!token) {
      throw new ApiError(400, "User not Logged In");
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decodedData);

    const user = await User.findById(decodedData._id).select("-password");
    if (!user) {
      throw new ApiError(404, "User Not Found");
    }
    req.user = user;
  } catch (error) {
    next(error);
  }
  next();
};
