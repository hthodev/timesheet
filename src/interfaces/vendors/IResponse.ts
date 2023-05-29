import { ObjectId } from "mongoose";
import { IProject } from "../DTO/IProject";
import { IProjectTask } from "../DTO/IProjectTask";
import ITimeSheet from "../DTO/ITimeSheet";
import { IProjectTargetUser } from "../DTO/IProjectTargetUser";
import { IUser } from "../DTO/Iuser";
import { ITask } from "../DTO/ITask";
import { IWorkingTime } from "../DTO/IWorkingTime";
import { IRole } from "../DTO/IRole";

export interface ProjectTargetUser {
  userId: number;
  roleName: string;
  id: number;
}
export interface IResponse {
  type: boolean;
  result: object | string;
}

export interface IUserTotal {
  totalCount: number;
  items: IUser[];
}
export interface IRoleTotal {
  totalCount: number;
  items: IRole[];
}

export interface ICustomerTotal {
  totalCount: number;
  items: object;
}
export interface ITaskName {
  _id: string;
  name: string;
  type: number;
  creationTime: string;
  id_task: number;
  __v: number;
}

export interface IProjectResponse extends IProject {
  customerName?: [
    {
      name: String;
    }
  ];
  tasksName?: ITaskName[];
  timeSheet?: ITimeSheet[];
  projectTask?: IProjectTask[];
  userTarget?: IProjectTargetUser[];
  userName?: IUser[];
  projectTargetUser: IUser[];
}
export interface IGetPMS extends IProject {
  userTarget: IProjectTargetUser[];
}

export interface ITimeSheetProject extends IProject {
  _id: ObjectId;
  userName: IUser[];
  timeSheets: ITimeSheet[];
  tasksName: ITask[];
}
export interface IManagerWorkingTimeResponse extends IWorkingTime {
  userProject: IProject[];
  userNames: IUser[];
}

export interface ITimeSheetProjectResponse {
  timeSheet: ITimeSheet[];
  project: IProjectResponse;
}

export interface statusResponseTimeSheet {
  success: number;
  fail: number;
}
