import { BaseRouter } from "./BaseRouter";
import authenticateController from "../controllers/Authenticate";
import { loginValidate } from "../validations/authenticateValidation";

class AuthenticateRoute extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.router.post(
      "/Authenticate",
      loginValidate,
      authenticateController.authenticate
    );
  }
}

export = new AuthenticateRoute().router;
