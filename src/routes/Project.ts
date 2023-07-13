import { BaseRouter } from "./BaseRouter";
import { checkLogin, checkRole } from "../middleware/authorization";
import projectController from "../controllers/Project";
import {
  inputValidate,
  projectValidate,
} from "../validations/projectValidation";
import { queryIdValidate, bodyIdValidate } from "../validations/idValidation";
import { ROLE } from "../utils/constant";

class ProjectRoute extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.router.post(
      "/Save",
      checkLogin,
      checkRole(ROLE.ADMIN, ROLE.MANAGER),
      projectValidate,
      projectController.createAndUpdateProject
    );
    this.router.get(
      "/getAll",
      checkLogin,
      checkRole(ROLE.ADMIN, ROLE.MANAGER),
      projectController.getAllProject
    );
    this.router.get(
      "/Get",
      checkLogin,
      checkRole(ROLE.ADMIN, ROLE.MANAGER),
      inputValidate,
      projectController.projectById
    );
    this.router.delete(
      "/Delete",
      checkLogin,
      checkRole(ROLE.ADMIN, ROLE.MANAGER),
      queryIdValidate,
      projectController.deleteProject
    );
    this.router.post(
      "/Inactive",
      checkLogin,
      checkRole(ROLE.ADMIN, ROLE.MANAGER),
      bodyIdValidate,
      projectController.inActiveProject
    );
    this.router.post(
      "/Active",
      checkLogin,
      checkRole(ROLE.ADMIN, ROLE.MANAGER),
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
