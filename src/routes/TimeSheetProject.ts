import { BaseRouter } from "./BaseRouter";
import { checkLogin, checkRole } from "../middleware/authorization";
import timeSheetProjectController from "../controllers/TimeSheetProject";
import { ROLE } from "../utils/constant";
class TimeSheetProjectRoute extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.router.get(
      "/GetTimeSheetStatisticTasks",
      checkLogin,
      checkRole(ROLE.ADMIN, ROLE.MANAGER),
      timeSheetProjectController.timeSheetProjectTask
    );

    this.router.get(
      "/GetTimeSheetStatisticTeams",
      checkLogin,
      checkRole(ROLE.ADMIN, ROLE.MANAGER),
      timeSheetProjectController.timeSheetProjectUser
    );
  }
}

export = new TimeSheetProjectRoute().router;
