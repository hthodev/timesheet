import { Document } from "mongoose";

export interface IPermission extends Document {
  id_permission: { type: number; require: true; unique: true };
  name: { type: string; require: true };
  childrens?: { type: IPermission[] };
  displayName?: { type: string };
  isConfiguration?: { type: boolean };
  multiTenancySides?: { type: number };
  roleId?: { type: number }
  creationTime?: { type: Date };
}
