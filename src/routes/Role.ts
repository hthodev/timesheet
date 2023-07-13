import { BaseRouter } from "./BaseRouter";
import { checkLogin, checkRole } from "../middleware/authorization";
import roleController from "../controllers/Role";
import { roleValidate } from "../validations/roleValidation";
import { queryIdValidate } from "../validations/idValidation";
import { updateWorkingTimeValidation } from "../validations/workingTimeValidation";
import { ROLE } from "../utils/constant"
class RoleRoute extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.router.post(
      "/Create",
      checkLogin,
      checkRole(ROLE.ADMIN),
      roleValidate,
      roleController.creatRole
    );
    this.router.get(
      "/GetAll",
      checkLogin,
      checkRole(ROLE.ADMIN),
      roleController.getAllPaggingRole
    );
    this.router.get(
      "/GetRoleForEdit",
      checkLogin,
      checkRole(ROLE.ADMIN),
      roleController.roleById
    );
    this.router.put(
      "/Update",
      checkLogin,
      checkRole(ROLE.ADMIN),
      updateWorkingTimeValidation,
      roleController.roleUpdate
    );
    this.router.delete(
      "/Delete",
      checkLogin,
      checkRole(ROLE.ADMIN),
      queryIdValidate,
      roleController.deleteRole
    );
  }
}

export = new RoleRoute().router;
