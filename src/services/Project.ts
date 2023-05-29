import jwtDecode from "jwt-decode";
import projectRepository from "../repositories/Project";
import { ApiError } from "../utils/apiError";
import httpStatus from "http-status";
import { ITokenDecode } from "../interfaces/vendors/ITokenDecode";
import { IProject } from "../interfaces/DTO/IProject";
import timeSheetRepository from "../repositories/TimeSheet";
import { IProjectResponse } from "../interfaces/vendors/IResponse";

class ProjectService {
  async createAndUpdateProject(projectData): Promise<IProject> {
    return await projectRepository.createAndUpdateProject(projectData);
  }

  async getAllProject(queryData) {
    const status: string = queryData.status;
    const search: string = queryData.search;
    return await projectRepository.getAllProject(status, search);
  }

  async projectById(queryData): Promise<IProject> {
    if (!queryData && !queryData.input) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Account does not exist!");
    }
    const input: number = queryData.input;
    const result: IProject = await projectRepository.projectById(input);

    const renameProjectId: IProject = result.toObject();
    renameProjectId.id = renameProjectId.id_project;
    delete renameProjectId.id_project;
    return renameProjectId;
  }

  async deleteProject(queryData): Promise<void> {
    const checkProjectExistsInTimesheet =
      await timeSheetRepository.checkTimeSheetError({
        projectId: queryData.Id,
      });
    if (checkProjectExistsInTimesheet) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Can't delete because project is existing in log timesheet!"
      );
    }
    await projectRepository.deleteProject(queryData.Id);
  }
  async inActiveProject(queryData): Promise<void> {
    const checkProjectExist = await projectRepository.checkProjectError({
      id_project: queryData.id,
    });
    if (!checkProjectExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "The project not found in the system!"
      );
    }
    await projectRepository.inActiveProject(queryData.id);
  }
  async activeProject(queryData): Promise<void> {
    const checkProjectExist = await projectRepository.checkProjectError({
      id_project: queryData.id,
    });
    if (!checkProjectExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "The project not found in the system!"
      );
    }
    await projectRepository.activeProject(queryData.id);
  }
  async projectsIncludingTasks(accountIsLogging: string): Promise<object[]> {
    const userDecocde: ITokenDecode = jwtDecode(accountIsLogging);
    const formated = [];
    const projects: IProjectResponse[] =
      await projectRepository.projectsIncludingTasks(userDecocde.id);
    for (const project of projects) {
      formated.push({
        customerName: project.customerName && project.customerName[0].name,
        id: project.id_project,
        listPM: await projectRepository.getPMSByProjectId(project.id_project),
        projectCode: project.code,
        projectName: project.name,
        projectUserType: project.projectType,
        targetUsers: project.projectTargetUsers.map((item) => {
          return {
            projectTargetUserId: item.id,
            userName:
              project.projectTargetUser &&
              project.projectTargetUser.find((tn) => tn.id === item.userId)
                .fullName,
          };
        }),
        tasks:
          project.tasks &&
          project.tasks.map((task) => ({
            projectTaskId:
              project.projectTask &&
              project.projectTask.find((tn) => tn.taskId === task.taskId)
                .id_projectTask,
            taskName:
              project.tasksName &&
              project.tasksName.find((tn) => tn.id_task === task.taskId).name,
            billable: task.billable,
            isDefaul: true,
          })),
      });
    }

    return formated;
  }
  async projectWorkingTimePM(): Promise<object> {
    const result: IProject[] = await projectRepository.projectWorkingTimePM();
    const formated = result.map((item) => {
      return {
        id: item.id_project,
        code: item.code,
        name: item.name,
      };
    });
    return formated;
  }
}

export = new ProjectService();
