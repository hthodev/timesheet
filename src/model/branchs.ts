import mongoose, { Schema, model } from "mongoose";
import { IBranch } from "../interfaces/DTO/IBranch";
const AutoIncrement = require("mongoose-sequence")(mongoose);

const branchSchema = new Schema<IBranch>({
  id_branch: {
    type: Number,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    require: true,
  },
  morningWorking: {
    type: Number,
  },
  morningStartAt: {
    type: String,
  },
  morningEndAt: {
    type: String,
  },
  afternoonWorking: {
    type: Number,
  },
  afternoonStartAt: {
    type: String,
  },
  afternoonEndAt: {
    type: String,
  },
  color: {
    type: String,
  },
  code: {
    type: String,
  },
  creatorUserId: {
    type: Number,
    ref: "Users",
  },
  creationTime: {
    type: Date,
    default: Date.now(),
  },
});

branchSchema.plugin(AutoIncrement, { inc_field: "id_branch" });

export const BranchModel = model("Branchs", branchSchema);
