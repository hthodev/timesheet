import { ResponseMessage } from "../utils/ResponseMessage";
import { Request, Response, NextFunction } from "express";
import myTimeSheetService from "../services/MyTimeSheet";
import { catchAsync } from "../utils/catchAsync";
import httpStatus from "http-status";
import ITimeSheet from "../interfaces/DTO/ITimeSheet";
class MyTimeSheetController {
  createMyTimeSheet = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await myTimeSheetService.creatMyTimeSheet(
        req.body,
        req.headers.authorization
      );
      res.status(httpStatus.CREATED).json(new ResponseMessage(result));
    }
  );

  allTimesheetOfUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result: object = await myTimeSheetService.allTimesheetOfUser(
        req.headers.authorization
      );
      res.status(httpStatus.OK).json(new ResponseMessage(result));
    }
  );

  timeSheetById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result: ITimeSheet = await myTimeSheetService.timeSheetById(
        req.query
      );
      res.status(httpStatus.OK).json(new ResponseMessage(result));
    }
  );
  updateTimeSheet = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await myTimeSheetService.updateTimeSheet(req.body);
      res.status(httpStatus.OK).json(new ResponseMessage());
    }
  );
  deleteTimeSheet = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await myTimeSheetService.deleteTimeSheet(req.query);
      res.status(httpStatus.OK).json(new ResponseMessage({}));
    }
  );
  submitToPending = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result: string = await myTimeSheetService.submitToPending(req.body);
      res.status(httpStatus.OK).json(new ResponseMessage(result));
    }
  );
}
export = new MyTimeSheetController();
