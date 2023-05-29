import { ResponseMessage } from "../utils/ResponseMessage";
import { Request, Response, NextFunction } from "express";
import authenticateService from "../services/Authenticate";
import { catchAsync } from "../utils/catchAsync";
import { ITokenDecode } from "../interfaces/vendors/ITokenDecode";
import jwtDecode from "jwt-decode";
import httpStatus from "http-status";
class AuthenticateController {
  authenticate = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await authenticateService.authenticate(req.body);

      const resultEncode: ITokenDecode = jwtDecode(result);

      const resultMessage = {
        accessToken: result,
        expireInSeconds: resultEncode.exp,
        userId: resultEncode.id,
      };
      return res.status(httpStatus.OK).json(new ResponseMessage(resultMessage));
    }
  );
}

export = new AuthenticateController();
