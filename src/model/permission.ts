import mongoose, { Schema, model } from "mongoose";
import { IPermission } from "../interfaces/DTO/IPermission";
const AutoIncrement = require("mongoose-sequence")(mongoose);

const permissionSchema = new Schema<IPermission>({
  id_permission: {
    type: Number,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    require: true,
  },
  childrens: {
    type: Array,
  },
  isConfiguration: {
    type: Boolean,
  },
  multiTenancySides: {
    type: Number,
  },
  displayName: {
    type: String,
  },
  creationTime: {
    type: Date,
    default: Date.now(),
  },
});

permissionSchema.plugin(AutoIncrement, { inc_field: "id_permission" });

export const PermissionModel = model("Permissions", permissionSchema);
