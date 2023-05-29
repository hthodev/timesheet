import { body, query } from "express-validator";
import { invalidResponse } from "./validation";

export const projectValidate = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 20 })
    .withMessage("Project name can only contain up to 20 characters!"),
  body("timeStart").notEmpty().withMessage("timeStart is required"),
  body("customerId").notEmpty().withMessage("Customer is required"),
  body("users").notEmpty().withMessage("Users is required"),
  body("code").notEmpty().withMessage("Code is required"),
  invalidResponse,
];
export const inputValidate = [
  query("input").notEmpty().withMessage("input is required"),
];
