import { Document } from "mongoose";

export interface IWorkingTime extends Document {
  id_workingTime: Number;
  reqestTime: Date;
  status: Number;
  applyDate: Date;
  morningStartTime: String;
  morningEndTime: String;
  morningWorkingTime: Number;
  afternoonStartTime: String;
  afternoonEndTime: String;
  afternoonWorkingTime: Number;
  userId: Number;
  id: Number;
}
