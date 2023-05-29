import { Request, Response, NextFunction } from "express";
import authGoogle from "../services/AuthGoogle";
import { catchAsync } from "../utils/catchAsync";
import httpStatus from "http-status";

interface RequestInfo extends Request {
  user: object;
}
class AuthGooleController {
  callbackGoogle = catchAsync(async (req: Request, res: Response) => {
    return await authGoogle.authGoogle();
  });

  getInfo = catchAsync(async (req: RequestInfo, res: Response) => {
    if (req.user) {
      res.status(200).json({
        error: false,
        message: "Successfully Loged In",
        user: req.user,
      });
    } else {
      res.status(403).json({ error: true, message: "Not Authorized" });
    }
  });

  failed = catchAsync(async (req: Request, res: Response) => {
    res.status(httpStatus.UNAUTHORIZED).json({
      error: true,
      message: "Log in failure",
    });
  });
}

export = new AuthGooleController();
