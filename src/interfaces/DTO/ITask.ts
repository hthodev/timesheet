import { Document } from "mongoose";

export interface ITask extends Document {
  id_task: number;
  name: string;
  type?: number;
  isDeleted?: boolean;
  deleterUserId?: number;
  deletionTime?: Date;
  creatorUserId?: number;
  creationTime?: Date;
}
