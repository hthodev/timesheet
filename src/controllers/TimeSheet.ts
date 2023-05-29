import { ResponseMessage } from "../utils/ResponseMessage";
import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import httpStatus from "http-status";
import timeSheetService from "../services/TimeSheet";
class TimeSheetController {
  getAll = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result: object[] = await timeSheetService.getAll(
        req.query,
        req.headers.authorization
      );
      res.status(httpStatus.OK).json(new ResponseMessage(result));
    }
  );
  approveTimesheets = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result: object = await timeSheetService.approveTimesheets(req.body);
      res.status(httpStatus.OK).json(new ResponseMessage(result));
    }
  );
  rejectTimesheets = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result: object = await timeSheetService.rejectTimesheets(req.body);
      res.status(httpStatus.OK).json(new ResponseMessage(result));
    }
  );
}

export = new TimeSheetController();
