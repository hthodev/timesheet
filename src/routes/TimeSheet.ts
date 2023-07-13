import { BaseRouter } from "./BaseRouter";
import { checkLogin, checkRole } from "../middleware/authorization";
import timeSheetController from "../controllers/TimeSheet";

class TimeSheetRoute extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.router.get("/GetAll", checkLogin, timeSheetController.getAll);
    this.router.post(
      "/ApproveTimesheets",
      checkLogin,
      timeSheetController.approveTimesheets
    );
    this.router.post(
      "/RejectTimesheets",
      checkLogin,
      timeSheetController.rejectTimesheets
    );
  }
}

export = new TimeSheetRoute().router;
