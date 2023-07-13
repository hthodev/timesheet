import { BaseRouter } from "./BaseRouter";
import TaskController from "../controllers/Task";
import { checkLogin, checkRole } from "../middleware/authorization";
import configurationController from "../controllers/Configuration";

class ConfigurationRoute extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.router.get(
      "/GetWorkingTimeConfigAllBranch",
      checkLogin,
      configurationController.workingTimeConfigAllBranch
    );
  }
}

export = new ConfigurationRoute().router;
