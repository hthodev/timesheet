import { body } from "express-validator";
import { invalidResponse } from "./validation";

export const customerValidate = [
  // body("name")
  //   .notEmpty()
  //   .withMessage("Name is required")
  //   .isLength({ max: 20 })
  //   .withMessage("Customer name can only contain up to 20 characters!"),
  // body("address")
  //   .notEmpty()
  //   .withMessage("Address is required")
  //   .isLength({ max: 30 })
  //   .withMessage("Address can only contain up to 30 characters!"),
  // invalidResponse,
];
