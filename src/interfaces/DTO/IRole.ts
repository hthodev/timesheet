import { Document } from "mongoose";

export interface IRole extends Document {
  id_role: Number;
  description: String;
  displayName: String;
  name: String;
  normalizedName: String;
}
