import { BaseRouter } from "./BaseRouter";
import { checkAdmin, checkLogin } from "../middleware/authorization";
import roleController from "../controllers/Role";
import { roleValidate } from "../validations/roleValidation";
import { queryIdValidate } from "../validations/idValidation";
import { updateWorkingTimeValidation } from "../validations/workingTimeValidation";

class RoleRoute extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.router.post(
      "/Create",
      checkLogin,
      checkAdmin,
      roleValidate,
      roleController.creatRole
    );
    this.router.get(
      "/GetAll",
      checkLogin,
      checkAdmin,
      roleController.getAllPaggingRole
    );
    this.router.get(
      "/GetRoleForEdit",
      checkLogin,
      checkAdmin,
      roleController.roleById
    );
    this.router.put(
      "/Update",
      checkLogin,
      checkAdmin,
      updateWorkingTimeValidation,
      roleController.roleUpdate
    );
    this.router.delete(
      "/Delete",
      checkLogin,
      checkAdmin,
      queryIdValidate,
      roleController.deleteRole
    );
  }
}

export = new RoleRoute().router;
