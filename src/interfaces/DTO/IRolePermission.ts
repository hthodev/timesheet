import { Document } from "mongoose";

export interface IRolePermission extends Document {
  id_rolePermission: { type: number; require: true; unique: true };
  roleId: { type: string; require: true };
  permissionId?: { type: number; require: true };
}
