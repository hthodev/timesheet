import { BaseRouter } from "./BaseRouter";
import { checkLogin, checkRole } from "../middleware/authorization";
import myWorkingTimeController from "../controllers/MyWorkingTime";
import { workingTimeValidation } from "../validations/workingTimeValidation";
import { queryIdValidate } from "../validations/idValidation";

class MyWorkingTimeRoute extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.router.get(
      "/GetMyCurrentWorkingTime",
      checkLogin,
      myWorkingTimeController.myCurrentWorkingTime
    );
    this.router.get(
      "/GetAllMyHistoryWorkingTime",
      checkLogin,
      myWorkingTimeController.allMyHistoryWorkingTime
    );
    this.router.post(
      "/SubmitNewWorkingTime",
      checkLogin,
      workingTimeValidation,
      myWorkingTimeController.submitNewWorkingTime
    );
    this.router.post(
      "/EditWorkingTime",
      checkLogin,
      workingTimeValidation,
      myWorkingTimeController.editWorkingTime
    );
    this.router.delete(
      "/DeleteWorkingTime",
      checkLogin,
      queryIdValidate,
      myWorkingTimeController.deleteWorkingTime
    );
  }
}

export = new MyWorkingTimeRoute().router;
