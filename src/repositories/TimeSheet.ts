import { ProjectModel } from "../model/projects";
import { TimeSheetModel } from "../model/timeSheets";
import {
  IProjectResponse,
  ITimeSheetProjectResponse,
  statusResponseTimeSheet,
} from "../interfaces/vendors/IResponse";
import ITimeSheet from "../interfaces/DTO/ITimeSheet";
require("dotenv").config();

class TimeSheetRepository {
  async checkTimeSheetError(query: object): Promise<ITimeSheet> {
    return await TimeSheetModel.findOne(query);
  }
  async getAll(
    startDate: Date,
    endDate: Date,
    status: number
  ): Promise<ITimeSheetProjectResponse> {
    const timeSheet: ITimeSheet[] = await TimeSheetModel.find({
      $and: [
        { dateAt: { $gte: startDate } },
        { dateAt: { $lte: endDate } },
        status != -1 ? { status: status } : {},
      ],
    });
    let project: IProjectResponse;
    for (const ts of timeSheet) {
      project = await ProjectModel.findOne({
        id_project: ts.projectId,
      })
        .populate("tasksName")
        .populate({ path: "userName", select: "-password" })
        .populate("customerName");
    }
    return { timeSheet: timeSheet, project: project };
  }

  async approveTimesheets(Id: number[]): Promise<statusResponseTimeSheet> {
    let success: number = 0;
    let fail: number = 0;
    for (const id of Id) {
      const update: ITimeSheet = await TimeSheetModel.findOneAndUpdate(
        { id_timeSheet: id },
        { status: 2 }
      );
      if (update) {
        success += 1;
      } else {
        fail += 1;
      }
    }
    return {
      success: success,
      fail: fail,
    };
  }
  async rejectTimesheets(Id: number[]): Promise<statusResponseTimeSheet> {
    let success = 0;
    let fail = 0;
    for (const id of Id) {
      const update: ITimeSheet = await TimeSheetModel.findOneAndUpdate(
        { id_timeSheet: id },
        { status: 3 }
      );
      if (update) {
        success += 1;
      } else {
        fail += 1;
      }
    }
    return {
      success: success,
      fail: fail,
    };
  }
}

export = new TimeSheetRepository();
