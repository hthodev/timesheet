import { BaseRouter } from "./BaseRouter";
import { checkLogin, checkRole } from "../middleware/authorization";
import myTimeSheetController from "../controllers/MyTimeSheet";
import {
  myTimeSheetValidate,
  updateMyTimeSheetValidate,
} from "../validations/timeSheetValidation";
import { queryIdValidate } from "../validations/idValidation";

class MyTimeSheetRoute extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.router.post(
      "/Create",
      checkLogin,
      myTimeSheetValidate,
      myTimeSheetController.createMyTimeSheet
    );
    this.router.get(
      "/GetAllTimeSheetOfUser",
      checkLogin,
      myTimeSheetController.allTimesheetOfUser
    );
    this.router.get("/Get", checkLogin, myTimeSheetController.timeSheetById);
    this.router.put(
      "/Update",
      checkLogin,
      updateMyTimeSheetValidate,
      myTimeSheetController.updateTimeSheet
    );
    this.router.delete(
      "/Delete",
      checkLogin,
      queryIdValidate,
      myTimeSheetController.deleteTimeSheet
    );
    this.router.post(
      "/SubmitToPending",
      checkLogin,
      myTimeSheetController.submitToPending
    );
  }
}

export = new MyTimeSheetRoute().router;
