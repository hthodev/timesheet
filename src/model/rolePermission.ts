import mongoose, { Schema, model } from "mongoose";
import { IRolePermission } from "../interfaces/DTO/IRolePermission";
const AutoIncrement = require("mongoose-sequence")(mongoose);

const rolePermissionSchema = new Schema<IRolePermission>({
  id_rolePermission: {
    type: Number,
    require: true,
    unique: true,
  },
  roleId: {
    type: String,
    require: true,
  },
  permissionId: {
    type: Array,
  },
});

rolePermissionSchema.plugin(AutoIncrement, { inc_field: "id_rolePermission" });

export const RolePermissionModel = model(
  "RolePermissions",
  rolePermissionSchema
);
