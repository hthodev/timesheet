import mongoose, { Schema, model } from "mongoose";
import { ITask } from "../interfaces/DTO/ITask";
const AutoIncrement = require("mongoose-sequence")(mongoose);

const taskSchema = new Schema<ITask>({
  id_task: { type: Number, unique: true, index: true, require: true },
  name: { type: String, require: true },
  type: { type: Number },
  isDeleted: { type: Boolean, default: false },
  creationTime: { type: Date, default: Date.now() },
});

taskSchema.plugin(AutoIncrement, { inc_field: "id_task" });
export const TaskModel = model("Tasks", taskSchema);
