import { ResponseMessage } from "../utils/ResponseMessage";
import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import httpStatus from "http-status";
import configurationService from "../services/Configuration";
import { IBranch } from "../interfaces/DTO/IBranch";
class ConfigurationController {
  workingTimeConfigAllBranch = catchAsync(
    async (req: Request, res: Response) => {
      const result: IBranch[] =
        await configurationService.workingTimeConfigAllBranch();
      return res.status(httpStatus.CREATED).json(new ResponseMessage(result));
    }
  );
}

export = new ConfigurationController();
