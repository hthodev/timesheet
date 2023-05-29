import { BaseRouter } from "./BaseRouter";
import branchController from "../controllers/Branch";
import { branchValidate } from "../validations/branchValidation";

class BranchRoute extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.router.post("/Save", branchValidate, branchController.creatBranch);
    this.router.get("/GetAllBranchFilter", branchController.allBranchFilter);
  }
}

export = new BranchRoute().router;
