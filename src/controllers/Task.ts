import { ResponseMessage } from "../utils/ResponseMessage";
import { Request, Response, NextFunction } from "express";
import taskService from "../services/Task";
import { catchAsync } from "../utils/catchAsync";
import httpStatus from "http-status";
class TaskController {
  createAndUpdateTask = catchAsync(async (req: Request, res: Response) => {
    await taskService.createAndUpdateTask(req.body);
    return res.status(httpStatus.CREATED).json(new ResponseMessage({}));
  });

  getAllTask = catchAsync(async (req: Request, res: Response) => {
    const result: object[] = await taskService.getAllTask();
    return res.status(httpStatus.OK).json(new ResponseMessage(result));
  });
  deleteTask = catchAsync(async (req: Request, res: Response) => {
    await taskService.deleteTask(req.query);
    return res.status(httpStatus.OK).json(new ResponseMessage({}));
  });

  archiveTask = catchAsync(async (req: Request, res: Response) => {
    await taskService.archiveTask(req.query);
    return res.status(httpStatus.OK).json(new ResponseMessage({}));
  });
  deArchiveTask = catchAsync(async (req: Request, res: Response) => {
    await taskService.deArchiveTask(req.body);
    return res.status(httpStatus.OK).json(new ResponseMessage({}));
  });
}

export = new TaskController();
