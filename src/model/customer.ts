import mongoose, { Schema, model } from "mongoose";
import { ICustomer } from "../interfaces/DTO/ICustomer";
const AutoIncrement = require("mongoose-sequence")(mongoose);

const customerSchema = new Schema<ICustomer>({
  id_customer: { type: Number, require: true, unique: true },
  name: { type: String, require: true },
  code: { type: String },
  address: { type: String },
  projectstasksId: { type: Number, ref: "projectTasks" },
  creatorUserId: { type: Number, ref: "users" },
  creationTime: { type: Date },
});

customerSchema.plugin(AutoIncrement, { inc_field: "id_customer" });
export const CustomerModel = model("Customers", customerSchema);
