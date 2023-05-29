import mongoose, { Schema, model } from "mongoose";
import { IProject } from "../interfaces/DTO/IProject";
const AutoIncrement = require("mongoose-sequence")(mongoose);
const projectSchema = new Schema<IProject>({
  id_project: { type: Number, unique: true, index: true, require: true },
  name: { type: String },
  code: { type: String },
  note: { type: String },
  status: { type: Number, enum: [0, 1] },
  projectType: { type: Number },
  timeStart: { type: Date },
  timeEnd: { type: Date },
  isAllUserBelongTo: { type: Boolean },
  projectTargetUsers: {
    type: [
      {
        userId: { type: Number },
        roleName: { type: String },
        id: { type: Number },
      },
    ],
  },
  creationTime: {
    type: Date,
    default: Date.now(),
  },
  customerId: { type: Number, ref: "Customers" },
  taskId: { type: Number, ref: "Tasks" },
  userId: { type: Number, ref: "Users" },
  tasks: {
    type: [
      {
        taskId: { type: Number },
        billable: { type: Boolean },
      },
    ],
    ref: "ProjectTasks",
  },
  users: {
    type: [
      {
        userId: { type: Number },
        type: { type: Number },
      },
    ],
    ref: "Users",
  },
  projectTargetUserId: { type: Number },
  targetUserWorkingTime: { type: Number },
});
projectSchema.set("toObject", { virtuals: true });
projectSchema.set("toJSON", { virtuals: true });

projectSchema.plugin(AutoIncrement, { inc_field: "id_project" });
projectSchema.virtual("customerName", {
  ref: "Customers",
  localField: "customerId",
  foreignField: "id_customer",
});
projectSchema.virtual("tasksName", {
  ref: "Tasks",
  localField: "tasks.taskId",
  foreignField: "id_task",
});
projectSchema.virtual("userTarget", {
  ref: "ProjectTargetUsers",
  localField: "id_project",
  foreignField: "projectId",
});
projectSchema.virtual("projectTask", {
  ref: "ProjectTasks",
  localField: "id_project",
  foreignField: "projectId",
});

projectSchema.virtual("userName", {
  ref: "Users",
  localField: "users.userId",
  foreignField: "id",
});
projectSchema.virtual("timeSheets", {
  ref: "TimeSheets",
  localField: "id_project",
  foreignField: "projectId",
});
projectSchema.virtual("projectTargetUser", {
  ref: "Users",
  localField: "projectTargetUsers.userId",
  foreignField: "id",
});

export const ProjectModel = model("Projects", projectSchema);
