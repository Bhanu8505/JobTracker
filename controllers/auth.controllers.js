import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { User } from "../models/User.model.js";
import { ApiError } from "../utils/api-error.js";
import {
  emailVerificationMailGencontent,
  resetPasswordMailGenContent,
  sendMail,
} from "../utils/mail.js";
import { responseHandler } from "../utils/responseHandler.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email, username, password, fullName } = req.body;
    // console.log(email, username, password, fullName);
    if (!email || !username || !password || !fullName) {
      throw new ApiError(400, "Some information missing");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "User Already exists");
    }

    const user = await User.create({
      email,
      username,
      password,
      fullName,
    });

    if (!user) throw new ApiError(500, "Cannot register user");

    // const token = crypto.randomBytes(32).toString("hex");
    const { unHashedToken, hashedToken } = user.generateRandomToken();
    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    const verificationUrl = `${process.env.BASE_URL}/api/v1/users/verify_user/${hashedToken}`;
    const mailGenContent = emailVerificationMailGencontent(
      username,
      verificationUrl
    );
    await sendMail({
      mailGenContent,
      email,
      subject: "Verify Your Email",
    });

    return responseHandler(res, 201, "User Created Successfully", user);
  } catch (error) {
    next(error);
  }
};

export const verifyUser = async (req, res, next) => {
  try {
    const { token } = req.params;
    if (!token) {
      throw new ApiError(400, "No Verification Token Present");
    }
    const user = await User.findOne({
      emailVerificationToken: token,
    });

    if (!user) {
      throw new ApiError(400, "Invalid Token");
    }

    if (user.emailVerificationExpiry < Date.now()) {
      throw new ApiError(400, "Token expired");
    }
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;
    await user.save();

    return responseHandler(res, 200, "User verified Successfully");
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, "Missing Credentials");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(404, "User not Found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ApiError(400, "Invalid Credentials");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    };

    res.cookie("token", token, cookieOptions);

    return responseHandler(res, 200, "User LoggedIn Successfully", user);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const loggedInUser = await User.findById(req.user.id).select("-password");
    if (!loggedInUser) {
      throw new ApiError(404, "User not Found");
    }
    return responseHandler(res, 200, "User Found", loggedInUser);
  } catch (error) {
    next(error);
  }
};

export const logOutUser = async (req, res, next) => {
  try {
    res.cookie("token", "", {
      expiresIn: new Date(0),
    });

    return responseHandler(res, 200, "User Logged Out Successfully");
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new ApiError(400, "Enter email");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(400, "No user Found");
    }

    const { hashedToken, unHashedToken } = user.generateRandomToken();
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    const username = user.username;
    const resetPasswordLink = `${process.env.BASE_URL}/users/resetpassword/${hashedToken}`;
    const resetPasswordMailContent = resetPasswordMailGenContent(
      username,
      resetPasswordLink
    );

    await sendMail({
      email: user.email,
      subject: "Reset Your Password",
      mailGenContent: resetPasswordMailContent,
    });

    return responseHandler(res, 200, "Reset Password link sent to your mail");
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { resetPasswordToken } = req.params;
    const { password } = req.body;
    if (!resetPasswordToken) {
      throw new ApiError(400, "No reset password token");
    }

    const user = await User.findOne({ resetPasswordToken });
    if (!user) {
      throw new ApiError(400, "Invalid Token");
    }

    if (user.resetPasswordExpiry < Date.now()) {
      throw new ApiError(400, "Token Expired");
    }

    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpiry = null;
    await user.save();

    return responseHandler(res, 200, "Password Changed Successfully");
  } catch (error) {
    next(error);
  }
};
