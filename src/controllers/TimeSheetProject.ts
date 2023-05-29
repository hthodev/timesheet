import { ResponseMessage } from "../utils/ResponseMessage";
import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import httpStatus from "http-status";
import timeSheetProjectService from "../services/TimeSheetProject";
class TimeSheetProjectController {
  timeSheetProjectTask = catchAsync(async (req: Request, res: Response) => {
    const result: object[] = await timeSheetProjectService.timeSheetProjectTask(
      req.query
    );
    return res.status(httpStatus.OK).json(new ResponseMessage(result));
  });

  timeSheetProjectUser = catchAsync(async (req: Request, res: Response) => {
    const result: object[] = await timeSheetProjectService.timeSheetProjectUser(
      req.query
    );
    return res.status(httpStatus.OK).json(new ResponseMessage(result));
  });
}

export = new TimeSheetProjectController();
