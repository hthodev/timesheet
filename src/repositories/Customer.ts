import { Document } from "mongoose";
import { ICustomerTotal } from "../interfaces/vendors/IResponse";
import { CustomerModel } from "../model/customer";
import { ICustomer } from "../interfaces/DTO/ICustomer";
import { ApiError } from "../utils/apiError";
import httpStatus from "http-status";
require("dotenv").config();

class CustomerRepository {
  async checkCustomerError(query: object): Promise<ICustomer> {
    return await CustomerModel.findOne(query);
  }
  async createOrUpdateCustomer(customerData): Promise<void> {
    const checkIdExist: ICustomer = await CustomerModel.findOne({
      id_customer: customerData.id,
    });

    if (checkIdExist) {
      await CustomerModel.findOneAndUpdate(
        { id_customer: customerData.id },
        {
          name: customerData.name,
          address: customerData.address,
          code: customerData.code,
        }
      );
    } else {
      const checkExistNameAndCode = await this.checkCustomerError({
        $or: [{ name: customerData.name }],
      });
      if (checkExistNameAndCode) {
        throw new ApiError(
          httpStatus.CONFLICT,
          "Name Or Code is existed in the system! "
        );
      }
      await new CustomerModel({
        name: customerData.name,
        address: customerData.address,
        code: customerData.code,
      }).save();
    }
  }

  async allCustomer(): Promise<Array<Document & ICustomer>> {
    return await CustomerModel.find();
  }

  async customerPagging(
    pageSize: number,
    skipCount: number,
    searchText: string
  ): Promise<ICustomerTotal> {
    const allCustomer: ICustomer[] = await CustomerModel.find({
      $or: [
        { name: { $regex: `.*${searchText}.*`, $options: "i" } },
        { customersName: { $regex: `.*${searchText}.*`, $options: "i" } },
      ],
    })
      .skip(skipCount)
      .limit(pageSize);

    const totalCustomer: number = await CustomerModel.countDocuments();
    const renameIdCustomer: ICustomer[] = allCustomer.map((customer) => {
      const obj: ICustomer = customer.toObject();
      obj.id = obj.id_customer;
      delete obj.id_customer;
      return obj;
    });
    return {
      totalCount: totalCustomer,
      items: renameIdCustomer,
    };
  }

  async deleteCustomer(id: number): Promise<void> {
    await CustomerModel.findOneAndDelete({
      id_customer: id,
    });
  }
}

export = new CustomerRepository();
