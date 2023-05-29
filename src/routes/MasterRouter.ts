import authenticateRoute from "./Authenticate";
import userRoute from "./User";
import taskRoute from "./Task";
import myTimesheets from "./MyTimeSheet";
import sessionRoute from "./Session";
import projectRoute from "./Project";
import branchRoute = require("./Branch");
import customerRoute = require("./Customer");
import timeSheetProjectRoute = require("./TimeSheetProject");
import roleRoute = require("./Role");
import timeSheetRoute = require("./TimeSheet");
import configurationRoute = require("./Configuration");
import myWorkingTimeRoute = require("./MyWorkingTime");
import authGoogle = require("./AuthenticateGoogle");
import manageWorkingTimeRoute = require("./ManageWorkingTime");
import { BaseRouter } from "./BaseRouter";
import bodyParser = require("body-parser");
import cors = require("cors");

class MasterRouter extends BaseRouter {
  constructor() {
    super();
    this.configure();
    this.init();
  }

  private configure() {
    // define onfigurations
    this.router.use(
      cors({
        origin: process.env.CLIENT_URL,
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
      })
    );

    this.router.use(bodyParser.json()); // to support JSON-encoded bodies
    this.router.use(
      bodyParser.urlencoded({
        // to support URL-encoded bodies
        extended: true,
      })
    );
  }

  /**
   * Connect routes to their matching routers.
   */
  protected init() {
    this.router.use("/tokenAuth", authenticateRoute);
    this.router.use("/services/app/User", userRoute);
    this.router.use("/services/app/Task", taskRoute);
    this.router.use("/services/app/Session", sessionRoute);
    this.router.use("/services/app/MyTimesheets", myTimesheets);
    this.router.use("/services/app/Project", projectRoute);
    this.router.use("/services/app/Customer", customerRoute);
    this.router.use("/services/app/TimeSheetProject", timeSheetProjectRoute);
    this.router.use("/services/app/Branch/", branchRoute);
    this.router.use("/services/app/Role", roleRoute);
    this.router.use("/services/app/Configuration", configurationRoute);
    this.router.use("/services/app/Timesheet", timeSheetRoute);
    this.router.use("/services/app/MyWorkingTime", myWorkingTimeRoute);
    this.router.use("/services/app/ManageWorkingTime", manageWorkingTimeRoute);
    this.router.use("/auth", authGoogle);
  }
}

export = new MasterRouter().router;
