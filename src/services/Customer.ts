import httpStatus from "http-status";
import { ICustomer } from "../interfaces/DTO/ICustomer";
import { IObj } from "../interfaces/vendors/IObject";
import customerRepository from "../repositories/Customer";
import { ApiError } from "../utils/apiError";
import { ICustomerTotal } from "../interfaces/vendors/IResponse";

class CustomerService {
  async creatOrUpdateCustomer(customerData): Promise<void> {
    await customerRepository.createOrUpdateCustomer(customerData);
  }

  async allCustomer() {
    const customers: ICustomer[] = await customerRepository.allCustomer();
    const renameIdCustomer: ICustomer[] = customers.map((customer) => {
      const obj: ICustomer = customer.toObject();
      obj.id = obj.id_customer;
      delete obj.id_customer;
      return obj;
    });
    return renameIdCustomer;
  }

  async customerPagging(queryData): Promise<ICustomerTotal> {
    const pageSize: number = queryData.maxResultCount;
    const skipCount: number = queryData.skipCount;
    const searchText: string = queryData.searchText;

    const customersPagging = await customerRepository.customerPagging(
      pageSize,
      skipCount,
      searchText
    );

    return customersPagging;
  }
  async deleteCustomer(idQuery): Promise<void> {
    const id: number = idQuery && idQuery.Id;
    const checkExistCustomer: ICustomer =
      await customerRepository.checkCustomerError({ id_customer: id });
    if (!checkExistCustomer) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Customer is not existed!`);
    }
    await customerRepository.deleteCustomer(id);
  }
}

export = new CustomerService();
