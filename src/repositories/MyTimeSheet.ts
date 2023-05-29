import { TimeSheetModel } from "../model/timeSheets";
import {
  IProjectResponse,
  ITimeSheetProjectResponse,
} from "../interfaces/vendors/IResponse";
import { ProjectModel } from "../model/projects";
import ITimeSheet from "../interfaces/DTO/ITimeSheet";
import { ProjectTaskModel } from "../model/projectTasks";
import { Document } from "mongoose";
import { PROJECT_STATUS, TIME_SHEET_STATUS } from "../utils/constant";
import ProjectRepository from "./Project";
import { ApiError } from "../utils/apiError";
import httpStatus from "http-status";
require("dotenv").config();

class MyTimeSheetRepository {
  async checkMyTimeSheetError(query: object): Promise<ITimeSheet[]> {
    return await TimeSheetModel.find(query);
  }

  async createMyTimeSheet(data: any, accoundIdIsLogging: number) {
    const getProjectTaskId = await ProjectTaskModel.findOne({
      id_projectTask: data.projectTaskId,
    });
    const projectIsInactive = await ProjectRepository.checkProjectError({
      id_project: getProjectTaskId.projectId,
    });
    if (projectIsInactive.status === PROJECT_STATUS.DEACTIVE) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Project has been deActive"
      );
    }

    const createTs: ITimeSheet = await new TimeSheetModel({
      ...data,
      userId: accoundIdIsLogging,
      taskId: getProjectTaskId.taskId,
      projectId: getProjectTaskId.projectId,
    }).save();
    return createTs;
  }

  async allTimesheetOfUser(
    idAccountIsLogging
  ): Promise<ITimeSheetProjectResponse> {
    let formatResponse = [];
    let project: IProjectResponse;
    const getTimeSheets: ITimeSheet[] = await TimeSheetModel.find({
      userId: idAccountIsLogging,
    });
    for (const timesheet of getTimeSheets) {
      project = await ProjectModel.findOne({
        id_project: timesheet.projectId,
      })
        .populate("customerName")
        .populate("tasksName");
    }

    return { timeSheet: getTimeSheets, project: project };
  }

  async timeSheetById(id: number): Promise<Document & ITimeSheet> {
    return await TimeSheetModel.findOne({ id_timeSheet: id });
  }

  async updateTimeSheet(updateData): Promise<void> {
    await TimeSheetModel.findOneAndUpdate(
      { id_timeSheet: updateData.id },
      { ...updateData }
    );
  }
  async deleteTimeSheet(id: number): Promise<void> {
    await TimeSheetModel.findOneAndDelete({ id_timeSheet: id });
  }
  async submitToPending(date): Promise<string> {
    const ts: ITimeSheet[] = await TimeSheetModel.find({
      dateAt: { $gte: date.startDate, $lte: date.endDate },
      status: 0,
    });
    for (const timeSheet of ts) {
      await TimeSheetModel.findOneAndUpdate(
        { id_timeSheet: timeSheet.id_timeSheet },
        { status: TIME_SHEET_STATUS.PENDING }
      );
    }
    return "Submit success timesheets";
  }
}

export = new MyTimeSheetRepository();
