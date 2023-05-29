import mongoose, { Schema, model } from "mongoose";
import { IProjectTask } from "../interfaces/DTO/IProjectTask";
const AutoIncrement = require("mongoose-sequence")(mongoose);

const projectTaskSchema = new Schema<IProjectTask>({
  id_projectTask: { type: Number, unique: true, require: true, index: true },
  taskId: { type: Number, ref: "Tasks" },
  projectId: { type: Number, ref: "Projects" },
  billable: { type: Boolean },
  lastModificationTime: { type: Date },
  lastModifierUserId: { type: Number, ref: "Users" },
  creationTime: {
    type: Date,
    default: Date.now(),
  },
});
export const autoIncrement = projectTaskSchema.plugin(AutoIncrement, {
  inc_field: "id_projectTask",
});
export const ProjectTaskModel = model("ProjectTasks", projectTaskSchema);
