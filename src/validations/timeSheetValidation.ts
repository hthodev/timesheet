import { body } from "express-validator";
import { invalidResponse } from "./validation";

export const timeSheetValidate = [
  body("projectTargetUserId")
    .notEmpty()
    .withMessage("ProjectTargetUser is required"),
  body("projectTaskId").notEmpty().withMessage("projectTaskId is required"),
  body("workingTime").notEmpty().withMessage("WorkingTime is required"),
  body("dateAt").notEmpty().withMessage("DateAt is required"),

  invalidResponse,
];

export const myTimeSheetValidate = [
  body("typeOfWork")
    .notEmpty()
    .withMessage("typeOfWork is required")
    .isNumeric()
    .withMessage("id must be a number!"),
  body("projectTaskId")
    .notEmpty()
    .withMessage("projectTaskId is required")
    .isNumeric()
    .withMessage("id must be a number!"),
  body("workingTime")
    .notEmpty()
    .withMessage("workingTime is required")
    .isNumeric()
    .withMessage("id must be a number!"),
  body("dateAt").notEmpty().withMessage("dateAt is required"),
  invalidResponse,
];
export const updateMyTimeSheetValidate = [
  ...myTimeSheetValidate,
  body("id")
    .notEmpty()
    .withMessage("id is required")
    .isNumeric()
    .withMessage("id must be a number!"),
  invalidResponse,
];

export const submitValidate = [
  body("startDate").notEmpty().withMessage("startDate is required"),
  body("endDate").notEmpty().withMessage("endDate is required"),
  invalidResponse,
];
