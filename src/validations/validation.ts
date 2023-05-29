import { Result, ValidationError, validationResult } from "express-validator";
import { ApiError } from "../utils/apiError";
import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";

export const invalidResponse = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsMessage = validationResult(req).array();

    throw new ApiError(
      httpStatus.UNPROCESSABLE_ENTITY,
      errorsMessage[0].msg,
      false,
      null,
      errorsMessage[0].msg
    );
  }
  next();
};
