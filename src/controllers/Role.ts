import { ResponseMessage } from "../utils/ResponseMessage";
import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import httpStatus from "http-status";
import roleService from "../services/Role";
class RoleController {
  creatRole = catchAsync(async (req: Request, res: Response) => {
    const result = await roleService.creatRole(req.body);
    res.status(httpStatus.OK).json(new ResponseMessage(result));
  });
  getAllPaggingRole = catchAsync(async (req: Request, res: Response) => {
    const result = await roleService.getAllPaggingRole(req.query);
    res.status(httpStatus.OK).json(new ResponseMessage(result));
  });
  roleById = catchAsync(async (req: Request, res: Response) => {
    const result = await roleService.roleById(req.query);
    res.status(httpStatus.OK).json(new ResponseMessage(result));
  });

  roleUpdate = catchAsync(async (req: Request, res: Response) => {
    await roleService.roleUpdate(req.body);
    res.status(httpStatus.OK).json(new ResponseMessage({}));
  });
  deleteRole = catchAsync(async (req: Request, res: Response) => {
    await roleService.deleteRole(req.query);
    res.status(httpStatus.OK).json(new ResponseMessage({}));
  });
}

export = new RoleController();
