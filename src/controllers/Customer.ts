import { Request, Response, NextFunction } from "express";
import customerService from "../services/Customer";
import { catchAsync } from "../utils/catchAsync";
import httpStatus from "http-status";
import { ResponseMessage } from "../utils/ResponseMessage";
import { ICustomer } from "../interfaces/DTO/ICustomer";
import { ICustomerTotal } from "../interfaces/vendors/IResponse";

class CustomerController {
  creatOrUpdateCustomer = catchAsync(async (req: Request, res: Response) => {
    await customerService.creatOrUpdateCustomer(req.body);
    return res.status(httpStatus.CREATED).json(new ResponseMessage({}));
  });

  allCustomer = catchAsync(async (req: Request, res: Response) => {
    const result: ICustomer[] = await customerService.allCustomer();
    return res.status(httpStatus.OK).json(new ResponseMessage(result));
  });

  customerPagging = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result: ICustomerTotal = await customerService.customerPagging(
        req.body
      );
      return res.status(httpStatus.OK).json(new ResponseMessage(result));
    }
  );

  deleteCustomer = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await customerService.deleteCustomer(req.query);
      return res.status(httpStatus.OK).json(new ResponseMessage({}));
    }
  );
}

export = new CustomerController();
