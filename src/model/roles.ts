import mongoose, { Schema, model } from "mongoose";
import { IRole } from "../interfaces/DTO/IRole";
const AutoIncrement = require("mongoose-sequence")(mongoose);

const roleSchema = new Schema<IRole>({
  id_role: {
    type: Number,
    require: true,
    unique: true,
  },
  description: { type: String },
  displayName: { type: String },
  name: { type: String },
  normalizedName: { type: String },
});
roleSchema.plugin(AutoIncrement, { inc_field: "id_role" });
roleSchema.pre("save", function (next) {
  this.normalizedName = this.name.toUpperCase();
  next();
});
export const RoleModel = model("Roles", roleSchema);
