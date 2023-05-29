import { body } from "express-validator";
import { invalidResponse } from "./validation";

export const loginValidate = [
  body("userNameOrEmailAddress")
    .notEmpty()
    .withMessage("userNameOrEmailAddress is required"),
  body("password").notEmpty().withMessage("password is required"),
  invalidResponse,
];
