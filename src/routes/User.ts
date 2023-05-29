import { BaseRouter } from "./BaseRouter";
import { checkAdmin, checkLogin } from "../middleware/authorization";
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

class UserRoute extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.router.post(
      "/Create",
      checkLogin,
      checkAdmin,
      createUserValidate,
      userController.creatUser
    );

    this.router.get("/GetAll", checkLogin, checkAdmin, userController.allUser);

    this.router.post(
      "/GetAllPagging",
      getAllUserPaggingValidate,
      checkLogin,
      checkAdmin,
      userController.allUserPagging
    );

    this.router.put(
      "/Update",
      checkLogin,
      checkAdmin,
      updateUserValidate,
      userController.updateUser
    );

    this.router.get(
      "/GetUserNotPagging",
      checkLogin,
      checkAdmin,
      userController.allUserNotPagging
    );

    this.router.get(
      "/GetAllManager",
      checkLogin,
      checkAdmin,
      userController.allManager
    );

    this.router.get(
      "/Get",
      queryIdValidate,
      checkLogin,
      checkAdmin,
      userController.getByIdUser
    );

    this.router.post(
      "/ChangeUserRole",
      checkLogin,
      checkAdmin,
      userController.changeRoleUser
    );

    this.router.put(
      "/UpdateRole",
      checkLogin,
      checkAdmin,
      userController.updateRoleUser
    );

    this.router.get(
      "/GetRoles",
      checkLogin,
      checkAdmin,
      userController.getRoleUser
    );

    this.router.delete(
      "/Delete",
      queryIdValidate,
      checkLogin,
      checkAdmin,
      userController.deleteUser
    );

    this.router.post(
      "/ResetPassword",
      checkLogin,
      checkAdmin,
      changePasswordValidate,
      userController.changePasswordUser
    );
    this.router.post(
      "/DeactiveUser",
      checkLogin,
      checkAdmin,
      bodyIdValidate,
      userController.deactiveUser
    );
    this.router.post(
      "/ActiveUser",
      checkLogin,
      checkAdmin,
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
