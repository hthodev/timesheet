import passport from "passport";
import { BaseRouter } from "./BaseRouter";
const router = require("express").Router();
require("dotenv").config();
import { Request, Response } from "express";
import authGoogle = require("../controllers/AuthGoogle");

interface RequestInfo extends Request {
  user: object;
}

class AuthGoogleRoute extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.router.get("/login/success", authGoogle.getInfo);

    this.router.get("/login/failed", authGoogle.failed);

    this.router.get("/google/callback", authGoogle.callbackGoogle);
  }
}

export = new AuthGoogleRoute().router;

module.exports = router;
