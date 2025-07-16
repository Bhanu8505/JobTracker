import { body } from "express-validator";

export const userRegisterValidation = () => {
  return [
    body("email")
      .normalizeEmail()
      .trim()
      .notEmpty()
      .withMessage("Email is Required")
      .bail()
      .isEmail()
      .withMessage("Invalid Email"),

    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is Required")
      .bail()
      .isLength({ min: 4 })
      .withMessage("minimum length should be 4")
      .bail()
      .isLength({ max: 15 })
      .withMessage("maximum length should be 15"),

    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password cannot be blank")
      .bail()
      .isLength({ min: 8 })
      .withMessage("Minimum length is 8")
      .bail()
      .isLength({ max: 15 })
      .withMessage("Maximum length is 15")
      .bail()
      .isStrongPassword()
      .withMessage("Password not strong enough"),
  ];
};

export const userLoginValidation = () => {
  return [
    body("username").trim().notEmpty().withMessage("username cannot be blank"),

    body("password").trim().notEmpty().withMessage("Password cannot be empty"),
  ];
};

export const jobCreationValidation = () => {
  return [
    body("title").trim().notEmpty().withMessage("Title cannot be blank"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description cannot be blank"),
    body("company").trim().notEmpty().withMessage("company cannot be blank"),
    body("jobLocation")
      .trim()
      .notEmpty()
      .withMessage("jobLocation cannot be blank"),
    body("positionType")
      .trim()
      .notEmpty()
      .withMessage("positionType cannot be blank")
      .isIn(["Full-Time", "Part-Time", "Contract", "Internship", "Remote"])
      .withMessage("Invalid Position Type"),
  ];
};
