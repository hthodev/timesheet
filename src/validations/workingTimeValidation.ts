import { body, query } from "express-validator";
import { invalidResponse } from "./validation";

export const workingTimeValidation = [
  body("applyDate").notEmpty().withMessage("applyDate is required"),
  body("morningStartTime")
    .notEmpty()
    .withMessage("morningStartTime is required"),
  body("morningEndTime").notEmpty().withMessage("morningEndTime is required"),
  body("morningWorkingTime")
    .notEmpty()
    .withMessage("morningWorkingTime is required"),
  body("afternoonStartTime")
    .notEmpty()
    .withMessage("afternoonStartTime is required"),
  body("afternoonEndTime")
    .notEmpty()
    .withMessage("afternoonEndTime is required"),
  body("afternoonWorkingTime")
    .notEmpty()
    .withMessage("afternoonWorkingTime is required"),
  body("status")
    .notEmpty()
    .withMessage("status is required")
    .isNumeric()
    .withMessage("id must be a number"),
  invalidResponse,
];

export const updateWorkingTimeValidation = [
  ...workingTimeValidation,
  body("id")
    .notEmpty()
    .withMessage("status is required")
    .isNumeric()
    .withMessage("id must be a number"),
];
