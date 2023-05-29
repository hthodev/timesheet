import httpStatus from "http-status";
import manageWorkingTimeService from "../services/ManageWorkingTime";
import { catchAsync } from "../utils/catchAsync";
import { ResponseMessage } from "../utils/ResponseMessage";
import { Request, Response } from "express";
import { IManagerWorkingTimeResponse } from "../interfaces/vendors/IResponse";

class ManageWorkingController {
  getAll = catchAsync(async (req: Request, res: Response) => {
    const result: IManagerWorkingTimeResponse[] =
      await manageWorkingTimeService.getAll(
        req.body,
        req.headers.authorization
      );
    return res.status(httpStatus.OK).json(new ResponseMessage(result));
  });
  approveWorkingTime = catchAsync(async (req: Request, res: Response) => {
    await manageWorkingTimeService.approveWorkingTime(
      req.query,
      req.headers.authorization
    );
    return res.status(httpStatus.OK).json(new ResponseMessage({}));
  });
  rejectWorkingTime = catchAsync(async (req: Request, res: Response) => {
    await manageWorkingTimeService.rejectWorkingTime(
      req.query,
      req.headers.authorization
    );
    return res.status(httpStatus.OK).json(new ResponseMessage({}));
  });
}

export = new ManageWorkingController();
