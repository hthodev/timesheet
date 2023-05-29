import { Document } from "mongoose";

interface ITimeSheet extends Document {
  id_timeSheet: number;
  projectTaskId: number;
  projectTargetUserId: number;
  taskId: number;
  note?: string;
  workingTime?: number;
  typeOfWork?: number;
  projectId?: number;
  targetUserWorkingTime?: number;
  dateAt?: Date;
  userId: number;
  isCharged?: boolean;
  status?: number;
  isUnlookedByEmployee?: boolean;
  isDeleted?: boolean;
  deletionTime?: boolean;
  deleterUserId?: number;
  lastModificationTime?: Date;
  lastModifierUser?: number;
  creationTime?: Date;
  creatorUserId?: number;
  id?: number;
}

export default ITimeSheet;
