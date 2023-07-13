import { BaseRouter } from "./BaseRouter";
import taskController from "../controllers/Task";
import { checkLogin, checkRole } from "../middleware/authorization";
import { taskValidate } from "../validations/taskValidation";
import { bodyIdValidate, queryIdValidate } from "../validations/idValidation";
import { ROLE } from "../utils/constant"
class TaskRoute extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.router.post(
      "/Save",
      checkLogin,
      checkRole(ROLE.ADMIN),
      taskValidate,
      taskController.createAndUpdateTask
    );
    this.router.get(
      "/GetAll",
      checkLogin,
      checkRole(ROLE.ADMIN),
      taskController.getAllTask
    );
    this.router.delete(
      "/Delete",
      checkLogin,
      checkRole(ROLE.ADMIN),
      queryIdValidate,
      taskController.deleteTask
    );

    this.router.delete(
      "/Archive",
      checkLogin,
      checkRole(ROLE.ADMIN),
      queryIdValidate,
      taskController.archiveTask
    );
    this.router.post(
      "/DeArchive",
      checkLogin,
      checkRole(ROLE.ADMIN),
      bodyIdValidate,
      taskController.deArchiveTask
    );
  }
}

export = new TaskRoute().router;
