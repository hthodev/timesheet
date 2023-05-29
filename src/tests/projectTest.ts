import chai from "chai";
import supertest from "supertest";
import { app, tokenADMIN, tokenBasicUser } from "./dataTest";
import httpStatus from "http-status";
const { expect } = chai;
const dataProject = {
  name: "intership - thiên",
  code: "intership - thiên",
  status: 0,
  projectType: 1,
  timeStart: "2023-03-20T17:00:00.000Z",
  timeEnd: "2023-08-20T17:00:00.000Z",
  projectTargetUsers: [],
  creationTime: "2023-04-22T19:33:45.810Z",
  customerId: 7,
  tasks: [
    {
      taskId: 1,
      billable: true,
    },
  ],
  users: [
    {
      userId: 8,
      type: 1,
    },
    {
      userId: 6,
      type: 0,
    },
    {
      userId: 5,
      type: 0,
    },
  ],
};

describe("testcase Project", () => {
  let id;
  it("should be create Project success", async () => {
    const { body, status } = await supertest(app)
      .post("services/app/Project/Save")
      .set("Authorization", tokenADMIN)
      .send(dataProject);
    id = body.result.id_project;
    expect(status).to.equal(201);
  });
  it("should be inActive Project", async () => {
    const { body, status } = await supertest(app)
      .post("services/app/Project/Inactive")
      .set("Authorization", tokenADMIN)
      .send({ id: id });
    expect(status).to.equal(200);
  });
  it("should be active Project", async () => {
    const { body, status } = await supertest(app)
      .post("services/app/Project/Active")
      .set("Authorization", tokenADMIN)
      .send({ id: id });
    expect(status).to.equal(200);
  });

  it("should be create Project fail because name and code has already", async () => {
    const { body, status } = await supertest(app)
      .post("services/app/Project/Save")
      .set("Authorization", tokenADMIN)
      .send(dataProject);
    expect(status).to.equal(409);
    expect(body.error.message).equal(
      "Project code or project name has already on the database!"
    );
  });
  it("should be delete", async () => {
    const { body, status } = await supertest(app)
      .delete(`services/app/Project/Delete?Id=${id}`)
      .set("Authorization", tokenADMIN);
    expect(status).to.equal(200);
  });

  it("should be getAll success", async () => {
    const { body, status } = await supertest(app)
      .get("services/app/Project/getAll?status=&search=")
      .set("Authorization", tokenADMIN);
    expect(status).to.equal(200);
  });

  it("should be getAll fail", async () => {
    const { body, status } = await supertest(app)
      .get("services/app/Project/getAll?status=&search=")
      .set("Authorization", tokenBasicUser);
    expect(status).to.equal(403);
    expect(body.error.message).equal(
      "You can't access this page without permission"
    );
  });
});
