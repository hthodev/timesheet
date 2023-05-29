import chai from "chai";
import supertest from "supertest";
import { app, tokenBasicUser } from "./dataTest";
const { expect } = chai;

describe("testcase Login", () => {
  it("login application success", async () => {
    const { body, status } = await supertest(app)
      .post("tokenAuth/Authenticate")

      .set("Authorization", await tokenBasicUser)
      .send({ userNameOrEmailAddress: "admin", password: "123qwe" });
    expect(status).equal(200);
  });

  it("login application fail because password wrong", async () => {
    const { body, status } = await supertest(app)
      .post("tokenAuth/Authenticate")

      .set("Authorization", await tokenBasicUser)
      .send({ userNameOrEmailAddress: "admin", password: "123qwee" });
    expect(status).equal(500);
    expect(body.error.details).equal("Password wrong");
    expect(body.unAuthorizedRequest).equal(false);
  });

  it("login application fail because Account isn't registered", async () => {
    const { body, status } = await supertest(app)
      .post("tokenAuth/Authenticate")

      .set("Authorization", await tokenBasicUser)
      .send({ userNameOrEmailAddress: "adminnn", password: "123qwe" });
    expect(status).equal(500);
    expect(body.error.details).equal("Account isn't registered");
    expect(body.unAuthorizedRequest).equal(false);
  });
});
