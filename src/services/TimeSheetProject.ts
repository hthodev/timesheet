import { ITasks, IUsers } from "../interfaces/DTO/IProject";
import ITimeSheet from "../interfaces/DTO/ITimeSheet";
import { ITimeSheetProject } from "../interfaces/vendors/IResponse";
import timeSheetProjectRepository from "../repositories/TimeSheetProject";
import { TIME_SHEET_STATUS, WORK_TYPE } from "../utils/constant";
class TimeSheetProjectService {
  async timeSheetProjectTask(queryData): Promise<object[]> {
    const projectId: number = queryData.projectId;
    const startDate: Date = queryData.startDate;
    const endDate: Date = queryData.endDate;
    const result: ITimeSheetProject =
      await timeSheetProjectRepository.timeSheetProjectTask(
        projectId,
        startDate,
        endDate
      );
    const tasks: ITasks[] = result && result.tasks;
    const timeSheets: ITimeSheet[] = result.timeSheets;
    let formated: object[] = [];
    let totalWorkingTime: number;
    let billableWorkingTime: number;
    for (const task of tasks) {
      if (result && timeSheets.length != 0) {
        totalWorkingTime = result.timeSheets.reduce(
          (acc, ts) =>
            ts.taskId === task.taskId && ts.status == TIME_SHEET_STATUS.APPROVED
              ? acc + ts.workingTime
              : acc,
          0
        );

        billableWorkingTime = result.timeSheets
          .filter((ts) => ts.taskId === task.taskId)
          .reduce((acc, ts) => {
            if (
              (ts.typeOfWork === WORK_TYPE.NORMAL &&
                ts.status === TIME_SHEET_STATUS.APPROVED) ||
              (ts.typeOfWork === WORK_TYPE.OVERTIME &&
                ts.isCharged === true &&
                ts.status === TIME_SHEET_STATUS.APPROVED)
            ) {
              return acc + ts.workingTime;
            } else {
              return acc;
            }
          }, 0);
      }
      formated.push({
        taskId: task.taskId,
        taskName:
          result &&
          result.tasksName &&
          result.tasksName.find((tn) => tn.id_task === task.taskId).name,
        totalWorkingTime: totalWorkingTime,
        billableWorkingTime: billableWorkingTime,
        billable: task.billable,
      });
    }
    return formated;
  }

  async timeSheetProjectUser(queryData): Promise<object[]> {
    const projectId: number = queryData.projectId;
    const startDate: Date = queryData.startDate;
    const endDate: Date = queryData.endDate;
    const result: ITimeSheetProject =
      await timeSheetProjectRepository.timeSheetProjectUser(
        projectId,
        startDate,
        endDate
      );
    const users: IUsers[] = result && result.users;
    const timeSheets: ITimeSheet[] = result.timeSheets;
    let formated: object[] = [];
    let totalWorkingTime: number;
    let billableWorkingTime: number;
    for (const user of users) {
      if (result && timeSheets.length != 0) {
        totalWorkingTime = result.timeSheets.reduce(
          (acc, ts) =>
            ts.userId === user.userId && ts.status == TIME_SHEET_STATUS.APPROVED
              ? acc + ts.workingTime
              : acc,
          0
        );
        billableWorkingTime = result.timeSheets
          .filter((ts) => ts.userId === user.userId)
          .reduce((acc, ts) => {
            if (
              (ts.typeOfWork === WORK_TYPE.NORMAL &&
                ts.status === TIME_SHEET_STATUS.APPROVED) ||
              (ts.typeOfWork === WORK_TYPE.OVERTIME &&
                ts.isCharged === true &&
                ts.status === TIME_SHEET_STATUS.APPROVED)
            ) {
              return acc + ts.workingTime;
            } else {
              return acc;
            }
          }, 0);
      }
      formated.push({
        userID: user.userId,
        userName:
          result &&
          result.userName &&
          result.userName.find((u) => u.id === user.userId).fullName,
        projectUserType: user.type,
        totalWorkingTime: totalWorkingTime,
        billableWorkingTime: billableWorkingTime,
      });
    }
    return formated;
  }
}

export = new TimeSheetProjectService();
