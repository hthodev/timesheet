import { BaseRouter } from "./BaseRouter";
import { checkLogin, checkRole } from "../middleware/authorization";
import customerController from "../controllers/Customer";
import { customerValidate } from "../validations/customerValidation";
import { queryIdValidate } from "../validations/idValidation";
import { ROLE } from "../utils/constant"

class CustomerRoute extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.router.post(
      "/Save",
      checkLogin,
      checkRole(ROLE.ADMIN),
      customerValidate,
      customerController.creatOrUpdateCustomer
    );
    this.router.get(
      "/GetAll",
      checkLogin,
      checkRole(ROLE.ADMIN, ROLE.MANAGER),
      customerController.allCustomer
    );
    this.router.post(
      "/GetAllPagging",
      checkLogin,
      checkRole(ROLE.ADMIN),
      customerController.customerPagging
    );

    this.router.delete(
      "/Delete",
      checkLogin,
      checkRole(ROLE.ADMIN),
      queryIdValidate,
      customerController.deleteCustomer
    );
  }
}

export = new CustomerRoute().router;
