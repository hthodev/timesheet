import { BaseRouter } from "./BaseRouter";
import sessionController from "../controllers/Session";

class SessionRoute extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.router.get("/GetCurrentLoginInformations", sessionController.session);
  }
}

export = new SessionRoute().router;
