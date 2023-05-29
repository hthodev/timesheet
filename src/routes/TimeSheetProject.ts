import { BaseRouter } from "./BaseRouter";
import { checkAdmin, checkLogin, checkRole } from "../middleware/authorization";
import timeSheetProjectController from "../controllers/TimeSheetProject";

class TimeSheetProjectRoute extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.router.get(
      "/GetTimeSheetStatisticTasks",
      checkLogin,
      checkRole("MANAGER", "ADMIN"),
      timeSheetProjectController.timeSheetProjectTask
    );

    this.router.get(
      "/GetTimeSheetStatisticTeams",
      checkLogin,
      checkRole("MANAGER", "ADMIN"),
      timeSheetProjectController.timeSheetProjectUser
    );
  }
}

export = new TimeSheetProjectRoute().router;
