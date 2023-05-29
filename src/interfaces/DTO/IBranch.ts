import { Document, ObjectId } from "mongoose";
export interface IBranch extends Document {
  id_branch: number;
  name: string;
  code: string;
  isDeleted: boolean;
  deleterUserId: number;
  deletionTime: Date;
  creatorUserId: number;
  creationTime: Date;
  morningWorking: Number;
  morningStartAt: String;
  morningEndAt: String;
  afternoonWorking: Number;
  afternoonStartAt: String;
  afternoonEndAt: String;
  color: String;
  id: number;
}
