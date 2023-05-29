import { body, query } from "express-validator";
import { invalidResponse } from "./validation";

export const queryIdValidate = [
  query("Id").notEmpty().withMessage("Id must be required!"),
  invalidResponse,
];
export const bodyIdValidate = [
  body("id").notEmpty().withMessage("Id must be required!"),
  invalidResponse,
];
