import { ResponseMessage } from "../utils/ResponseMessage";
import { Request, Response, NextFunction } from "express";
import projectService from "../services/Project";
import { catchAsync } from "../utils/catchAsync";
import httpStatus from "http-status";
import { IProject } from "../interfaces/DTO/IProject";
class projectController {
  createAndUpdateProject = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result: IProject = await projectService.createAndUpdateProject(
        req.body
      );
      res.status(httpStatus.CREATED).json(new ResponseMessage(result));
    }
  );
  getAllProject = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await projectService.getAllProject(req.query);
      res.status(httpStatus.OK).json(new ResponseMessage(result));
    }
  );
  projectById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result: IProject = await projectService.projectById(req.query);
      res.status(httpStatus.OK).json(new ResponseMessage(result));
    }
  );

  deleteProject = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await projectService.deleteProject(req.query);
      res.status(httpStatus.OK).json(new ResponseMessage({}));
    }
  );
  inActiveProject = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await projectService.inActiveProject(req.body);
      res.status(httpStatus.OK).json(new ResponseMessage({}));
    }
  );
  activeProject = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await projectService.activeProject(req.body);
      res.status(httpStatus.OK).json(new ResponseMessage({}));
    }
  );
  projectsIncludingTasks = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await projectService.projectsIncludingTasks(
        req.headers.authorization
      );
      res.status(httpStatus.OK).json(new ResponseMessage(result));
    }
  );

  projectWorkingTimePM = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await projectService.projectWorkingTimePM();
      res.status(httpStatus.OK).json(new ResponseMessage(result));
    }
  );
}

export = new projectController();
