import { NextFunction, Request, Response } from "express";
import userService from "../services/User";
import { catchAsync } from "../utils/catchAsync";
import { ResponseMessage } from "../utils/ResponseMessage";
import httpStatus from "http-status";
interface MulterRequest extends Request {
  file: any;
}

class UserController {
  creatUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await userService.createUser(req.body);
      res.status(httpStatus.CREATED).json(new ResponseMessage({}));
    }
  );

  allUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await userService.allUser();
      res.status(httpStatus.OK).json(new ResponseMessage(result));
    }
  );

  allUserPagging = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.allUserPagging(
      req.body,
      req.headers && req.headers.authorization
    );
    res.status(httpStatus.OK).json(new ResponseMessage(result));
  });

  updateUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await userService.updateUser(req.body);
      res.status(httpStatus.OK).json(new ResponseMessage(result));
    }
  );

  allUserNotPagging = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.allUserNotPagging();
    res.status(httpStatus.OK).json(new ResponseMessage(result));
  });

  allManager = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.allManager();
    res.status(httpStatus.OK).json(new ResponseMessage(result));
  });

  changeRoleUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.changeRoleUser(req.body);
    res.status(httpStatus.OK).json(new ResponseMessage(result));
  });

  updateRoleUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.updateRoleUser(req.body);
    res.status(httpStatus.OK).json(new ResponseMessage(result));
  });
  getByIdUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.getByIdUser(req.query);
    res.status(httpStatus.OK).json(new ResponseMessage(result));
  });

  getRoleUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.getRoleUser();
    res.status(httpStatus.OK).json(new ResponseMessage({ items: result }));
  });

  deleteUser = catchAsync(async (req: Request, res: Response) => {
    await userService.deleteUser(req.query);
    res.status(200).json({});
  });

  changePasswordUser = catchAsync(async (req: Request, res: Response) => {
    await userService.changePasswordUser(req.headers.authorization, req.body);
    res.status(httpStatus.OK).json(new ResponseMessage({}));
  });

  deactiveUser = catchAsync(async (req: Request, res: Response) => {
    await userService.deactiveUser(req.body);
    res.status(httpStatus.OK).json(new ResponseMessage({}));
  });

  activeUser = catchAsync(async (req: Request, res: Response) => {
    await userService.activeUser(req.body);
    res.status(httpStatus.OK).json(new ResponseMessage({}));
  });

  updateImageUser = catchAsync(async (req: MulterRequest, res: Response) => {
    const result = await userService.updateImageUser(
      req.body.userId,
      req.file.filename
    );
    res.status(httpStatus.OK).json(new ResponseMessage(result));
  });

  imageUser = catchAsync(async (req: MulterRequest, res: Response) => {
    const result = await userService.imageUser(req.params);
    res.setHeader("Content-Type", "image/jpg");
    res.end(result);
  });
}

export = new UserController();
