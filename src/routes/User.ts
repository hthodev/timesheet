import { BaseRouter } from "./BaseRouter";
import { checkLogin, checkRole } from "../middleware/authorization";
import {
  getAllUserPaggingValidate,
  createUserValidate,
  updateUserValidate,
  changePasswordValidate,
  uploadValidate,
} from "../validations/userValidatiton";
import userController from "../controllers/User";
import { upload } from "../middleware/multer";
import { queryIdValidate, bodyIdValidate } from "../validations/idValidation";
import { ROLE } from "../utils/constant"
class UserRoute extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.router.post(
      "/Create",
      checkLogin,
      checkRole(ROLE.ADMIN),
      createUserValidate,
      userController.creatUser
    );

    this.router.get("/GetAll", checkLogin, checkRole(ROLE.ADMIN), userController.allUser);

    this.router.post(
      "/GetAllPagging",
      getAllUserPaggingValidate,
      checkLogin,
      checkRole(ROLE.ADMIN),
      userController.allUserPagging
    );

    this.router.put(
      "/Update",
      checkLogin,
      checkRole(ROLE.ADMIN),
      updateUserValidate,
      userController.updateUser
    );

    this.router.get(
      "/GetUserNotPagging",
      checkLogin,
      checkRole(ROLE.ADMIN),
      userController.allUserNotPagging
    );

    this.router.get(
      "/GetAllManager",
      checkLogin,
      checkRole(ROLE.ADMIN),
      userController.allManager
    );

    this.router.get(
      "/Get",
      queryIdValidate,
      checkLogin,
      checkRole(ROLE.ADMIN),
      userController.getByIdUser
    );

    this.router.post(
      "/ChangeUserRole",
      checkLogin,
      checkRole(ROLE.ADMIN),
      userController.changeRoleUser
    );

    this.router.put(
      "/UpdateRole",
      checkLogin,
      checkRole(ROLE.ADMIN),
      userController.updateRoleUser
    );

    this.router.get(
      "/GetRoles",
      checkLogin,
      checkRole(ROLE.ADMIN),
      userController.getRoleUser
    );

    this.router.delete(
      "/Delete",
      queryIdValidate,
      checkLogin,
      checkRole(ROLE.ADMIN),
      userController.deleteUser
    );

    this.router.post(
      "/ResetPassword",
      checkLogin,
      checkRole(ROLE.ADMIN),
      changePasswordValidate,
      userController.changePasswordUser
    );
    this.router.post(
      "/DeactiveUser",
      checkLogin,
      checkRole(ROLE.ADMIN),
      bodyIdValidate,
      userController.deactiveUser
    );
    this.router.post(
      "/ActiveUser",
      checkLogin,
      checkRole(ROLE.ADMIN),
      bodyIdValidate,
      userController.activeUser
    );
    this.router.post(
      "/UpdateAvatar",
      uploadValidate,
      upload.single("file"),
      userController.updateImageUser
    );
  }
}

export = new UserRoute().router;
