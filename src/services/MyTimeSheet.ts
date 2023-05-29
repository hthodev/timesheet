import jwtDecode from "jwt-decode";
import { ITokenDecode } from "../interfaces/vendors/ITokenDecode";
import myTimeSheetRepository from "../repositories/MyTimeSheet";
import { ApiError } from "../utils/apiError";
import httpStatus from "http-status";
import ITimeSheet from "../interfaces/DTO/ITimeSheet";
import ProjectRepository from "../repositories/Project";
import UserRepository from "../repositories/User";

class MyTimeSheetService {
  async creatMyTimeSheet(data, accountIsLogging): Promise<ITimeSheet> {
    const userDecode: ITokenDecode = jwtDecode(accountIsLogging);
    const checkDateAt: ITimeSheet[] =
      await myTimeSheetRepository.checkMyTimeSheetError({
        dateAt: data.dateAt,
        typeOfWork: 0,
      });

    if (data.typeOfWork === 0) {
      const checkHourOnDay: number = checkDateAt.reduce(
        (accumulator, currentValue) => {
          return accumulator + currentValue.workingTime;
        },
        0
      );
      if (checkHourOnDay + (data && data.workingTime) > 480) {
        throw new ApiError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Normal working hour must be < 8 hours"
        );
      }

      const dateAt: Date = new Date(data.dateAt);
      const dayOfWeek: number = dateAt.getDay();
      if (dayOfWeek === 6 && checkHourOnDay + data.workingTime > 240) {
        throw new ApiError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Can't working on Saturday over 4 hours!"
        );
      }

      const checkUserIsWorking = await UserRepository.checkUserError({
        id: userDecode.id,
      });
      if (checkUserIsWorking.isStopWork === true) {
        throw new ApiError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Account has stop working, please contact to ADMIN!"
        );
      }
    }
    return await myTimeSheetRepository.createMyTimeSheet(data, userDecode.id);
  }

  async allTimesheetOfUser(accountIsLogging): Promise<object> {
    const userDecocde: ITokenDecode = jwtDecode(accountIsLogging);
    const result = await myTimeSheetRepository.allTimesheetOfUser(
      userDecocde.id
    );
    let formatResponse = [];
    const getTimeSheet: ITimeSheet[] = result.timeSheet;
    const project = result.project;
    for (const timesheet of getTimeSheet) {
      formatResponse.push({
        customerName: project.customerName && project.customerName[0].name,
        projectName: project.name,
        projectCode: project.code,
        note: project.note,
        taskName:
          project.tasksName &&
          project.tasksName.find(
            (taskName) => taskName.id_task === timesheet.taskId
          ).name,
        id: timesheet.id_timeSheet,
        status: timesheet.status,
        projectTaskId: timesheet.projectTaskId,
        dateAt: timesheet.dateAt,
        typeOfWork: timesheet.typeOfWork,
        workingTime: timesheet.workingTime,
        isCharged: timesheet.isCharged,
        billable:
          project.tasks &&
          project.tasks.find((tn) => tn.taskId === timesheet.taskId).billable,
      });
    }
    return formatResponse;
  }

  async timeSheetById(idQuery): Promise<ITimeSheet> {
    const id: number = idQuery && idQuery.id;
    const result = await myTimeSheetRepository.timeSheetById(id);
    const renameId: ITimeSheet = result.toObject();
    renameId.id = result.id_timeSheet;
    delete renameId.id_timeSheet;
    return renameId;
  }
  async updateTimeSheet(updateData): Promise<void> {
    const checkExist = await myTimeSheetRepository.checkMyTimeSheetError({
      id_timeSheet: updateData.id,
    });
    if (!checkExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "This Your TimeSheet not exist in the system!"
      );
    }
    await myTimeSheetRepository.updateTimeSheet(updateData);
  }
  async deleteTimeSheet(idQuery): Promise<void> {
    const id: number = idQuery && idQuery.Id;
    await myTimeSheetRepository.deleteTimeSheet(id);
  }
  async submitToPending(date): Promise<string> {
    return await myTimeSheetRepository.submitToPending(date);
  }
}

export = new MyTimeSheetService();
