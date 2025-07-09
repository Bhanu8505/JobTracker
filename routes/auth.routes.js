import { Router } from "express";
import { userRegisterValidation } from "../validators/index.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  forgotPassword,
  getUser,
  loginUser,
  logOutUser,
  registerUser,
  resetPassword,
  verifyUser,
} from "../controllers/auth.controllers.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.middlware.js";

const userRouter = Router();

userRouter
  .route("/register")
  .post(userRegisterValidation(), validate, registerUser);

userRouter.route("/verify_user/:token").get(verifyUser);

userRouter.route("/login").post(loginUser);

userRouter.route("/get_me").get(isLoggedIn, getUser);

userRouter.route("/logout").get(isLoggedIn, logOutUser);

userRouter.route("/forgotPassword").post(forgotPassword);

userRouter.route("/resetpassword/:resetPasswordToken").post(resetPassword);

export default userRouter;
