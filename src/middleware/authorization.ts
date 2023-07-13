import { Request, Response, NextFunction } from "express";
import jwtDecode from "jwt-decode";
import { ApiError } from "../utils/apiError";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
require("dotenv").config();

interface checkToken {
  roleNames: [string];
  exp: number;
}

export const checkRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const decodeToken: checkToken | null = req?.headers?.authorization
        ? jwtDecode(req?.headers?.authorization)
        : null;

    if (decodeToken?.roleNames?.some((role) => roles.includes(role))) {
      next();
    } else {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        "You can't access this page without permission"
      );
      // res.redirect("http://localhost:5500")
    }
  };
};

export const checkLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req?.headers?.authorization) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Current user did not login to the application!"
    );
  } else {
    jwt.verify(
      req?.headers?.authorization.split(" ")[1],
      process.env.JWT_SECRET,
      (err, decode) => {
        let isExpiredToken: boolean = false;
        let dateNow: Date = new Date();
        dateNow.setHours(dateNow.getHours() + 7);

        let dateToken = new Date(decode.exp * 1000);

        if (dateToken < dateNow) {
          isExpiredToken = true;
        }

        if (isExpiredToken === true) {
          throw new ApiError(
            httpStatus.UNAUTHORIZED,
            "Your session was expired!"
          );
        } else {
          next();
        }
      }
    );
  }
};
