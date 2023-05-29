import { body } from "express-validator";
import { invalidResponse } from "./validation";

export const branchValidate = [
  body("name")
    .notEmpty()
    .withMessage("Branch name is required")
    .isLength({ max: 20 })
    .withMessage("Branch name can only contain up to 20 characters!"),
  body("code").notEmpty().withMessage("Branch code is required"),
  body("morningWorking")
    .notEmpty()
    .withMessage("morningWorking is required")
    .isFloat()
    .withMessage("morningWorking is a float number"),
  body("morningStartAt").notEmpty().withMessage("morningStartAt is required"),
  body("morningEndAt").notEmpty().withMessage("morningEndAt is required"),
  body("afternoonWorking")
    .notEmpty()
    .withMessage("afternoonWorking is required")
    .isFloat()
    .withMessage("morningWorking is a float number"),
  body("afternoonStartAt")
    .notEmpty()
    .withMessage("afternoonStartAt is required"),
  body("afternoonEndAt").notEmpty().withMessage("afternoonEndAt is required"),
  invalidResponse,
];
