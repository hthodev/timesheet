import { ProjectModel } from "../model/projects";
import { ITimeSheetProject } from "../interfaces/vendors/IResponse";
require("dotenv").config();

class TimeSheetProjectRepository {
  async timeSheetProjectTask(
    projectId: number,
    startDate,
    endDate
  ): Promise<ITimeSheetProject> {
    const project: ITimeSheetProject = await ProjectModel.findOne({
      id_project: projectId,
    })
      .populate({ path: "tasksName", select: "name id_task" })
      .populate({
        path: "timeSheets",
        select:
          "workingTime projectId status dateAt taskId typeOfWork isCharged",
        match: {
          $and: [
            startDate ? { dateAt: { $gte: startDate } } : {},
            endDate ? { dateAt: { $lte: endDate } } : {},
          ],
        },
      });

    return project;
  }

  async timeSheetProjectUser(
    projectId: number,
    startDate,
    endDate
  ): Promise<ITimeSheetProject> {
    const project: ITimeSheetProject = await ProjectModel.findOne({
      id_project: projectId,
    })
      .populate({ path: "userName", select: "id fullName" })
      .populate({
        path: "timeSheets",
        select:
          "workingTime projectId status dateAt userId typeOfWork isCharged",
        match: {
          $and: [
            { dateAt: { $gte: startDate } },
            { dateAt: { $lte: endDate } },
          ],
        },
      });
    return project;
  }
}

export = new TimeSheetProjectRepository();
