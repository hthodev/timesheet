import { BaseRouter } from "./BaseRouter";
import taskController from "../controllers/Task";
import { checkAdmin, checkLogin } from "../middleware/authorization";
import { taskValidate } from "../validations/taskValidation";
import { bodyIdValidate, queryIdValidate } from "../validations/idValidation";

class TaskRoute extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.router.post(
      "/Save",
      checkLogin,
      checkAdmin,
      taskValidate,
      taskController.createAndUpdateTask
    );
    this.router.get(
      "/GetAll",
      checkLogin,
      checkAdmin,
      taskController.getAllTask
    );
    this.router.delete(
      "/Delete",
      checkLogin,
      checkAdmin,
      queryIdValidate,
      taskController.deleteTask
    );

    this.router.delete(
      "/Archive",
      checkLogin,
      checkAdmin,
      queryIdValidate,
      taskController.archiveTask
    );
    this.router.post(
      "/DeArchive",
      checkLogin,
      checkAdmin,
      bodyIdValidate,
      taskController.deArchiveTask
    );
  }
}

export = new TaskRoute().router;
