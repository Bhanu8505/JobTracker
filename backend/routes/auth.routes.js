import { Router } from "express";
import {
  userEditValidation,
  userRegisterValidation,
} from "../validators/index.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  editUser,
  forgotPassword,
  getUser,
  loginUser,
  logOutUser,
  reactivateUser,
  registerUser,
  resetPassword,
  softDeleteUser,
  verifyUser,
} from "../controllers/auth.controllers.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.middlware.js";

const userRouter = Router();

userRouter
  .route("/register")
  .post(userRegisterValidation(), validate, registerUser);

userRouter.route("/verify_user/:token").get(verifyUser);

userRouter.route("/login").post(loginUser);

userRouter
  .route("/edit_user")
  .patch(isLoggedIn, userEditValidation(), validate, editUser);

userRouter.route("/get_me").get(isLoggedIn, getUser);

userRouter.route("/logout").get(isLoggedIn, logOutUser);

userRouter.route("/forgotPassword").post(forgotPassword);

userRouter.route("/resetpassword/:resetPasswordToken").post(resetPassword);

userRouter.route("/softdelete").get(isLoggedIn, softDeleteUser);

userRouter.route("/reactivate").get(isLoggedIn, reactivateUser);

export default userRouter;
