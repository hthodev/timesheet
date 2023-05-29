import chai from "chai";
import supertest from "supertest";
import { app, tokenBasicUser } from "./dataTest";
const { expect } = chai;

describe("testcase TimeSheet", () => {
  let id;
  it("create TimeSheet success", async () => {
    const { body, status } = await supertest(app)
      .post("services/app/MyTimesheets/Create")

      .set("Authorization", await tokenBasicUser)
      .send({
        typeOfWork: 0,
        projectTaskId: 38,
        projectTargetUserId: null,
        workingTime: 480,
        targetUserWorkingTime: 0,
        dateAt: "2023-04-10",
      });
    id = body.result.id_timeSheet;
    expect(status).equal(201);
  });

  it("delete TimeSheet", async () => {
    const { body, status } = await supertest(app)
      .delete(`services/app/MyTimesheets/Delete?Id=${id}`)
      .set("Authorization", await tokenBasicUser);
    expect(status).equal(200);
  });

  it("create TimeSheet fail because working time > 8 hours/day", async () => {
    const { body, status, error } = await supertest(app)
      .post("services/app/MyTimesheets/Create")
      .set("Authorization", tokenBasicUser)
      .send({
        typeOfWork: 0,
        projectTaskId: 38,
        projectTargetUserId: null,
        workingTime: 630,
        targetUserWorkingTime: 0,
        dateAt: "2023-04-11",
      });
    expect(status).equal(500);
    expect(body.error.message).equal("Normal working hour must be < 8 hours");
  });

  it("create TimeSheet fail because working time on Saturday > 4 hours", async () => {
    const { body, status } = await supertest(app)
      .post("services/app/MyTimesheets/Create")
      .set("Authorization", tokenBasicUser)
      .send({
        typeOfWork: 0,
        projectTaskId: 38,
        projectTargetUserId: null,
        workingTime: 550,
        targetUserWorkingTime: 0,
        dateAt: "2023-04-22",
      });
    expect(status).equal(500);
  });

  it("should getAll", async () => {
    const { body, status } = await supertest(app)
      .get("services/app/MyTimesheets/GetAllTimeSheetOfUser")
      .set("Authorization", tokenBasicUser);

    expect(status).to.equal(200);
  });
});
