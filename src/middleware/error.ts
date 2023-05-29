import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import mongoose, { Error } from "mongoose";
import { ApiError } from "../utils/apiError";
import { ResponseMessage, errorMessage } from "../utils/ResponseMessage";

export const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode
      ? error.statusCode
      : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    const errorMessage = err.stack.split("\n")[0];

    error = new ApiError(statusCode, message, false, errorMessage);
  }
  next(error);
};
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message } = err;
  if (!statusCode || !message) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }
  res.locals.errorMessage = err.message;

  const errMessage = new errorMessage(
    0,
    err.message,
    err.details,
    err.validation
  );
  res
    .status(statusCode)
    .json(new ResponseMessage({}, null, false, errMessage, false, true));
};
