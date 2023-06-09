import { Server } from "./server";
import dotenv from "dotenv";
import { DBConnection } from "./configs/dbConn";
import { errorConverter, errorHandler } from "./middleware/error";
import UserController from "./controllers/User";
// import passport from "passport";
const cookieSession = require("cookie-session");
import cors = require("cors");

// require("./passport");
require("dotenv").config();

/**cle
 * Application class.
 * @description Handle init config and components.
 */
dotenv.config({
  path: ".env",
});

export class Application {
  server: Server;

  init() {
    this.initServer();
  }

  private initServer() {
    this.server = new Server();
  }

  start() {
    DBConnection();
    this.server.app.use(errorConverter);
    this.server.app.use(errorHandler);
    this.server.app.use(
      cookieSession({
        name: "session",
        keys: ["cyberwolve"],
        maxAge: 24 * 60 * 60 * 100,
      })
    );

    // this.server.app.use(passport.initialize());
    // this.server.app.use(passport.session());
    this.server.app.use("/api", this.server.router);
    this.server.app.get("/avatars/:name", UserController.imageUser);
    ((port = process.env.APP_PORT || 5000) => {
      this.server.app.listen(port, () =>
        console.log(`> Listening on port ${port}`)
      );
    })();
  }
}
