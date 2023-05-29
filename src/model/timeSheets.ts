import mongoose, { Schema, model } from "mongoose";
import ITimeSheet from "../interfaces/DTO/ITimeSheet";
const AutoIncrement = require("mongoose-sequence")(mongoose);

const timeSheetSchema = new Schema<ITimeSheet>({
  id_timeSheet: { type: Number, require: true, unique: true },
  projectTaskId: { type: Number, ref: "projectTasks" },
  projectTargetUserId: { type: Number, ref: "projectTargetUsers" },
  taskId: { type: Number, ref: "tasks" },
  projectId: { type: Number },
  note: { type: String },
  workingTime: { type: Number },
  typeOfWork: { type: Number },
  targetUserWorkingTime: { type: Number },
  dateAt: { type: Date },
  userId: { type: Number, ref: "users" },
  isCharged: { type: Boolean, default: false },
  status: { type: Number, default: 0 },
  isUnlookedByEmployee: { type: Boolean },
  lastModificationTime: { type: Date },
  lastModifierUser: { type: Number, ref: "users" },
  creationTime: {
    type: Date,
    default: Date.now(),
  },
});
timeSheetSchema.plugin(AutoIncrement, { inc_field: "id_timeSheet" });
timeSheetSchema.set("toObject", { virtuals: true });
timeSheetSchema.set("toJSON", { virtuals: true });
timeSheetSchema.virtual("getProject", {
  ref: "Projects",
  localField: "userId",
  foreignField: "users.userId",
});
timeSheetSchema.virtual("getProjectTask", {
  ref: "ProjectTasks",
  localField: "projectTaskId",
  foreignField: "id_projectTask",
});
timeSheetSchema.virtual("userName", {
  ref: "Users",
  localField: "userId",
  foreignField: "id",
});
timeSheetSchema.virtual("projects", {
  ref: "Projects",
  localField: "projectId",
  foreignField: "id_project",
});
export const TimeSheetModel = model("TimeSheets", timeSheetSchema);
