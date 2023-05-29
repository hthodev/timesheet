import mongoose, { Schema, model } from "mongoose";
import { IUser } from "../interfaces/DTO/Iuser";
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new Schema<IUser>({
  id: {
    type: Number,
    unique: true,
    index: true,
    require: true,
  },
  userName: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  emailAddress: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
  roleNames: {
    type: [String],
  },
  type: {
    type: Number,
    enum: [0, 1, 2],
  },
  salary: {
    type: Number,
  },
  salaryAt: {
    type: Date,
  },
  startDateAt: {
    type: Date,
  },
  allowedLeaveDay: {
    type: Number,
  },
  userCode: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
  level: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  },
  registerWorkDay: {
    type: String,
  },
  managerId: {
    type: Number,
  },
  branchId: {
    type: Number,
  },
  sex: {
    type: Number,
    enum: [0, 1],
  },
  avatarPath: {
    type: String,
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
  isWorkingTimeDefault: {
    type: Boolean,
  },
  isStopWork: {
    type: Boolean,
    default: false,
  },
  fullName: {
    type: String,
  },
  branchDisplayName: {
    type: String,
  },
  managerName: {
    type: String,
  },
  creationTime: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.plugin(AutoIncrement, { inc_field: "id" });
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

userSchema.virtual("projectUsers", {
  ref: "Projects",
  localField: "id",
  foreignField: "users.userId",
});

export const UserModel = model("Users", userSchema);
