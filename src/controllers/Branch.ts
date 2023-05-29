import { Request, Response, NextFunction } from "express";
import branchService from "../services/Branch";
import { catchAsync } from "../utils/catchAsync";
import { ResponseMessage } from "../utils/ResponseMessage";
import httpStatus from "http-status";
class BranchController {
  creatBranch = catchAsync(async (req: Request, res: Response) => {
    await branchService.createBranch(req.body);
    return res.status(httpStatus.CREATED).json(new ResponseMessage({}));
  });

  allBranchFilter = catchAsync(async (req: Request, res: Response) => {
    const result = await branchService.allBranchFilter();
    return res.status(httpStatus.OK).json(new ResponseMessage(result));
  });
}

export = new BranchController();
