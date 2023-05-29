import { ResponseMessage } from "../utils/ResponseMessage";
import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import httpStatus from "http-status";
import myWorkingTimeService from "../services/MyWorkingTime";
import { IWorkingTime } from "../interfaces/DTO/IWorkingTime";
class MyWorkingTimeController {
  myCurrentWorkingTime = catchAsync(async (req: Request, res: Response) => {
    const result: object = await myWorkingTimeService.myCurrentWorkingTime(
      req.headers.authorization
    );
    return res.status(httpStatus.OK).json(new ResponseMessage(result));
  });
  allMyHistoryWorkingTime = catchAsync(async (req: Request, res: Response) => {
    const result: IWorkingTime[] =
      await myWorkingTimeService.allMyHistoryWorkingTime(
        req.headers.authorization
      );
    return res.status(httpStatus.OK).json(new ResponseMessage(result));
  });
  submitNewWorkingTime = catchAsync(async (req: Request, res: Response) => {
    await myWorkingTimeService.submitNewWorkingTime(
      req.body,
      req.headers.authorization
    );
    return res.status(httpStatus.OK).json(new ResponseMessage({}));
  });
  editWorkingTime = catchAsync(async (req: Request, res: Response) => {
    await myWorkingTimeService.editWorkingTime(req.body);
    return res.status(httpStatus.OK).json(new ResponseMessage({}));
  });
  deleteWorkingTime = catchAsync(async (req: Request, res: Response) => {
    await myWorkingTimeService.deleteWorkingTime(req.query);
    return res.status(httpStatus.OK).json(new ResponseMessage({}));
  });
}

export = new MyWorkingTimeController();
