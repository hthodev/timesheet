import { BaseRouter } from "./BaseRouter";
import { checkAdmin, checkLogin } from "../middleware/authorization";
import manageWorkingTimeController from "../controllers/ManageWorkingTime";

class ManageWorkingRoute extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.router.post("/GetAll", checkLogin, manageWorkingTimeController.getAll);
    this.router.post(
      "/ApproveWorkingTime",
      checkLogin,
      manageWorkingTimeController.approveWorkingTime
    );
    this.router.post(
      "/RejectWorkingTime",
      checkLogin,
      manageWorkingTimeController.rejectWorkingTime
    );
  }
}

export = new ManageWorkingRoute().router;
