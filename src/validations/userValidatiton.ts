import { body } from "express-validator";
import { invalidResponse } from "./validation";

export const updateUserValidate = [
  body("emailAddress").isEmail().withMessage("Provide valid email"),

  body("userName")
    .notEmpty()
    .withMessage("Provide valid userName")
    .isLength({ max: 20 })
    .withMessage("Username can only contain up to 20 characters!"),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 20 })
    .withMessage("Name can only contain up to 20 characters!")
    .isString()
    .withMessage("Name should be string"),

  body("surname")
    .notEmpty()
    .withMessage("Surname is required")
    .isLength({ max: 20 })
    .withMessage("Surname can only contain up to 20 characters!")
    .isString()
    .withMessage("Surname should be string"),

  body("roleNames").notEmpty().withMessage("roleNames is required"),

  body("userCode").notEmpty().withMessage("userCode is required"),
  body("sex").notEmpty().withMessage("sex is required"),
  invalidResponse,
];
export const createUserValidate = [
  ...updateUserValidate,
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password shoud be at least 6 character!")
    .isLength({ max: 20 })
    .withMessage("Password can only contain up to 20 characters!"),
  body("managerId").notEmpty().withMessage("managerId is required"),
];

export const getAllUserPaggingValidate = [
  body("maxResultCount")
    .notEmpty()
    .withMessage("maxResultCount must be entered"),
  body("skipCount").notEmpty().withMessage("skipCount must be entered"),
  invalidResponse,
];
export const changePasswordValidate = [
  body("adminPassword").notEmpty().withMessage("adminPassword is required"),
  body("userId").notEmpty().withMessage("managerId is required"),
  body("newPassword").notEmpty().withMessage("newPassword is required"),
  invalidResponse,
];
export const uploadValidate = [
  body("file").notEmpty().withMessage("file is required"),
  body("userId").notEmpty().withMessage("userId is required"),
];
