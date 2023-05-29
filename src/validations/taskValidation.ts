import { body } from "express-validator";
import { invalidResponse } from "./validation";

export const taskValidate = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 20 })
    .withMessage("Task name can only contain up to 20 characters!"),
  body("type").notEmpty().withMessage("Type is required"),
  invalidResponse,
];
