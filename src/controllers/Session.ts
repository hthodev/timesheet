import { ResponseMessage } from "../utils/ResponseMessage";
import { Request, Response, NextFunction } from "express";
import sessionService from "../services/Session";
import { catchAsync } from "../utils/catchAsync";
import httpStatus from "http-status";
import { IUser } from "../interfaces/DTO/Iuser";
class SessionController {
  session = catchAsync(async (req: Request, res: Response) => {
    let dateNow: Date = new Date();
    dateNow.setHours(dateNow.getHours() + 7);

    const resultMassage: object = {
      application: {
        version: process.version,
        releaseDate: dateNow,
        features: {},
      },
      user: null,
      tenant: null,
    };

    if (!req.headers.authorization) {
      const errMessage = {
        message: "End of login session",
        details: "You need to re-login",
      };
      res
        .json(new ResponseMessage(resultMassage, null, false, errMessage))
        .status(httpStatus.NO_CONTENT);
    } else {
      const result: IUser = await sessionService.session(
        req.headers.authorization
      );

      res.status(httpStatus.OK).json(
        new ResponseMessage(
          Object.assign(resultMassage, {
            user: result,
          })
        )
      );
    }
  });
}

export = new SessionController();
