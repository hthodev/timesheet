import mongoose, { Schema, model } from "mongoose";
import { IWorkingTime } from "../interfaces/DTO/IWorkingTime";
const AutoIncrement = require("mongoose-sequence")(mongoose);

const workingTimeSchema = new Schema<IWorkingTime>({
  id_workingTime: { type: Number, unique: true, index: true, require: true },
  reqestTime: { type: Date, default: Date.now() },
  status: { type: Number },
  applyDate: { type: Date },
  morningStartTime: { type: String },
  morningEndTime: { type: String },
  morningWorkingTime: { type: Number },
  afternoonStartTime: { type: String },
  afternoonEndTime: { type: String },
  afternoonWorkingTime: { type: Number },
  userId: { type: Number },
});
workingTimeSchema.set("toObject", { virtuals: true });
workingTimeSchema.set("toJSON", { virtuals: true });

workingTimeSchema.virtual("userNames", {
  ref: "Users",
  localField: "userId",
  foreignField: "id",
});
workingTimeSchema.virtual("userProject", {
  ref: "Projects",
  localField: "userId",
  foreignField: "users.userId",
});

workingTimeSchema.plugin(AutoIncrement, { inc_field: "id_workingTime" });
export const WorkingTimeModel = model("WorkingTimes", workingTimeSchema);
