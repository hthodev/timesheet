import jwtDecode from "jwt-decode";
import { ITokenDecode } from "../interfaces/vendors/ITokenDecode";
import TimeSheetRepository from "../repositories/TimeSheet";
import projectRepository from "../repositories/Project";
import {
  IProjectResponse,
  ITimeSheetProjectResponse,
  statusResponseTimeSheet,
} from "../interfaces/vendors/IResponse";
import ITimeSheet from "../interfaces/DTO/ITimeSheet";
import { ApiError } from "../utils/apiError";
import httpStatus from "http-status";
import { USER_TYPE } from "../utils/constant";
class TimeSheetService {
  async getAll(filterData, accountIsLogging: string): Promise<object[]> {
    const startDate: Date = new Date(filterData.startDate);
    const endDate: Date = new Date(filterData.endDate);
    const status: number | null = filterData.status;
    const tokenDecodeUser: ITokenDecode = jwtDecode(accountIsLogging);

    const result: ITimeSheetProjectResponse = await TimeSheetRepository.getAll(
      startDate,
      endDate,
      status
    );

    const timeSheets: ITimeSheet[] = result.timeSheet;
    const project: IProjectResponse = result.project;

    let formatResponse: object[] = [];

    for (const timeSheet of timeSheets) {
      let isAccountIsLoggingIsPM: Boolean = false;
      const userPM = project.users.find(
        (user) =>
          user &&
          user.userId === tokenDecodeUser.id &&
          user.type === USER_TYPE.STAFF
      );
      if (userPM) {
        isAccountIsLoggingIsPM = true;
      }

      if (isAccountIsLoggingIsPM === true) {
        formatResponse.push({
          status: timeSheet.status,
          workingTime: timeSheet.workingTime,
          dateAt: timeSheet.dateAt,
          projectId: timeSheet.projectId,
          user:
            project.userName &&
            project.userName.find((user) => user.id === timeSheet.userId).name,
          userId: timeSheet.userId,
          taskId: timeSheet.taskId,
          taskName:
            project.tasksName &&
            project.tasksName.find((task) => task.id_task === timeSheet.taskId)
              .name,
          mytimesheetNote: timeSheet.note,
          customerName: project.customerName && project.customerName[0].name,
          projectName: project.name,
          projectCode: project.code,
          typeOfWork: timeSheet.typeOfWork,
          isCharged: timeSheet.isCharged,
          isUserInProject: true,
          type:
            project.userName &&
            project.userName.find((user) => user.id === timeSheet.userId).type,
          avatarPath:
            project.userName &&
            project.userName.find((user) => user.id === timeSheet.userId)
              .avatarPath,
          level:
            project.userName &&
            project.userName.find((user) => user.id === timeSheet.userId).level,
          listPM: await projectRepository.getPMSByProjectId(project.id_project),
          branchDisplayName:
            project.userName &&
            project.userName.find((user) => user.id === timeSheet.userId)
              .branchDisplayName,
          id: timeSheet.id_timeSheet,
        });
      } else {
        return formatResponse;
      }
    }
    return formatResponse;
  }
  async approveTimesheets(id): Promise<object> {
    const checkExist = await TimeSheetRepository.checkTimeSheetError({
      id_timeSheet: id,
    });
    if (!checkExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "this TimeSheet isn't existed in the system"
      );
    }
    const result: statusResponseTimeSheet =
      await TimeSheetRepository.approveTimesheets(id);
    return {
      success: ` - Success ${result.success} timesheets.`,
      successCount: result.success,
      failedCount: result.fail,
      fail: ` - Fail ${result.fail} timesheets.`,
      lockDate: ` - Locked date: ${new Date().toISOString().substring(0, 10)}`,
    };
  }
  async rejectTimesheets(id): Promise<object> {
    const checkExist = await TimeSheetRepository.checkTimeSheetError({
      id_timeSheet: id,
    });
    if (!checkExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "this TimeSheet isn't existed in the system"
      );
    }
    const result: statusResponseTimeSheet =
      await TimeSheetRepository.rejectTimesheets(id);
    return {
      success: ` - Success ${result.success} timesheets.`,
      fail: ` - Fail ${result.fail} timesheets.`,
      lockDate: ` - Locked date: ${new Date().toISOString().substring(0, 10)}`,
    };
  }
}

export = new TimeSheetService();
