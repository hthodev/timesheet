import passport from "passport";

class AuthGoogle {
  async authGoogle(): Promise<void> {
    passport.authenticate("google", {
      successRedirect: process.env.CLIENT_URL,
      failureRedirect: "/login/failed",
    });
  }
}

export = new AuthGoogle();
