import { Document } from "mongoose";

export interface IProjectTask extends Document {
  id_projectTask: number;
  taskId: number;
  projectId: number;
  billable?: Boolean;
  isDeleted?: boolean;
  lastModificationTime?: Date;
  lastModifierUserId?: number;
  creatorUserId?: number;
  deleterUserId?: number;
  creationTime?: Date;
}
