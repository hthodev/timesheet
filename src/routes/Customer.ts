import { BaseRouter } from "./BaseRouter";
import { checkAdmin, checkLogin, checkRole } from "../middleware/authorization";
import customerController from "../controllers/Customer";
import { customerValidate } from "../validations/customerValidation";
import { queryIdValidate } from "../validations/idValidation";

class CustomerRoute extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.router.post(
      "/Save",
      checkLogin,
      checkAdmin,
      customerValidate,
      customerController.creatOrUpdateCustomer
    );
    this.router.get(
      "/GetAll",
      checkLogin,
      checkRole("MANAGER", "ADMIN"),
      customerController.allCustomer
    );
    this.router.post(
      "/GetAllPagging",
      checkLogin,
      checkAdmin,
      customerController.customerPagging
    );

    this.router.delete(
      "/Delete",
      checkLogin,
      checkAdmin,
      queryIdValidate,
      customerController.deleteCustomer
    );
  }
}

export = new CustomerRoute().router;
