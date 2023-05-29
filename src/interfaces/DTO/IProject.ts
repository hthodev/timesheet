import { Document } from "mongoose";

export interface IUsers {
  userId: number;
  type: number;
}
export interface ITasks {
  taskId: Number;
  billable: Boolean;
}
export interface IProject extends Document {
  id_project: number;
  name: string;
  code: string;
  note: string;
  status: number;
  projectType: number;
  timeStart: Date;
  timeEnd: Date;
  isAllUserBelongTo: Boolean;
  isAllUserBeLongTo: boolean;
  projectTargetUsers: [
    {
      userId: number;
      roleName: string;
      id: number;
    }
  ];
  isDeleted: boolean;
  creatorUserId: number;
  deleterUserId: number;
  deletionTime: Date;
  creationTime: Date;
  customerId: number;
  taskId: number;
  userId: number;
  projectTargetUserId: number;
  targetUserWorkingTime: number;
  tasks: ITasks[];
  users: IUsers[];
}
