import { BaseRouter } from "./BaseRouter";
import { checkAdmin, checkLogin, checkRole } from "../middleware/authorization";
import projectController from "../controllers/Project";
import {
  inputValidate,
  projectValidate,
} from "../validations/projectValidation";
import { queryIdValidate, bodyIdValidate } from "../validations/idValidation";

class ProjectRoute extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.router.post(
      "/Save",
      checkLogin,
      checkRole("MANAGER", "ADMIN"),
      projectValidate,
      projectController.createAndUpdateProject
    );
    this.router.get(
      "/getAll",
      checkLogin,
      checkRole("MANAGER", "ADMIN"),
      projectController.getAllProject
    );
    this.router.get(
      "/Get",
      checkLogin,
      checkRole("MANAGER", "ADMIN"),
      inputValidate,
      projectController.projectById
    );
    this.router.delete(
      "/Delete",
      checkLogin,
      checkRole("MANAGER", "ADMIN"),
      queryIdValidate,
      projectController.deleteProject
    );
    this.router.post(
      "/Inactive",
      checkLogin,
      checkRole("MANAGER", "ADMIN"),
      bodyIdValidate,
      projectController.inActiveProject
    );
    this.router.post(
      "/Active",
      checkLogin,
      checkRole("MANAGER", "ADMIN"),
      bodyIdValidate,
      projectController.activeProject
    );
    this.router.get(
      "/GetProjectsIncludingTasks",
      checkLogin,
      projectController.projectsIncludingTasks
    );
    this.router.get(
      "/GetProjectPM",
      checkLogin,
      projectController.projectWorkingTimePM
    );
  }
}

export = new ProjectRoute().router;
