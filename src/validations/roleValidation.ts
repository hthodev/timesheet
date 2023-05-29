import { body } from "express-validator";
import { invalidResponse } from "./validation";

export const roleValidate = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 20 })
    .withMessage("Role name can only contain up to 20 characters!"),
  body("displayName")
    .notEmpty()
    .withMessage("DisplayName is required")
    .isLength({ max: 20 })
    .withMessage("DisplayName can only contain up to 20 characters!"),
  invalidResponse,
];
