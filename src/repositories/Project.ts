import { ProjectModel } from "../model/projects";
import { ProjectTaskModel, autoIncrement } from "../model/projectTasks";
import { ProjectTargetUserModel } from "../model/projectTargetUsers";
import { CountModel } from "../model/counter";
import { IGetPMS, IProjectResponse } from "../interfaces/vendors/IResponse";
import { UserModel } from "../model/users";
import { IProject } from "../interfaces/DTO/IProject";
import { ICounter } from "../interfaces/DTO/ICounter";
import { ApiError } from "../utils/apiError";
import httpStatus from "http-status";
import { TimeSheetModel } from "../model/timeSheets";
import { PROJECTUSER_TYPE, PROJECT_STATUS } from "../utils/constant";
require("dotenv").config();

class ProjectRepository {
  async checkProjectError(query: object): Promise<IProject> {
    return await ProjectModel.findOne(query);
  }
  async createAndUpdateProject(projectData): Promise<IProject> {
    let currentProjectIndex: ICounter = await CountModel.findOne({
      id: "id_project",
    });

    let projectTargetUsers = [];
    for (const user of projectData && projectData.users) {
      for (const userTarget of projectData && projectData.projectTargetUsers) {
        if (user.type === 2) {
          projectTargetUsers.push({
            userId: userTarget.userId,
            roleName: userTarget.roleName,
            id: user.userId,
          });
        }
      }
    }

    const checkIdForCreateOrUpdate: IProject = await this.checkProjectError({
      id_project: projectData.id,
    });
    //create
    if (!checkIdForCreateOrUpdate) {
      const checkDataExistInProject: IProject = await ProjectModel.findOne({
        $or: [{ name: projectData.name }, { code: projectData.code }],
      });

      if (checkDataExistInProject) {
        throw new ApiError(
          httpStatus.CONFLICT,
          `Project code or project name has already on the database!`
        );
      }

      const createProject: IProject = await new ProjectModel({
        ...projectData,
        status: 0,
        projectTargetUsers: projectTargetUsers,
      }).save();

      for (const userData of projectData.users) {
        await new ProjectTargetUserModel({
          userId: userData.userId,
          projectId: currentProjectIndex.seq + 1,
          type: userData.type,
        }).save();
      }
      for (const taskData of projectData.tasks) {
        await new ProjectTaskModel({
          taskId: taskData.taskId,
          billable: taskData.billable,
          projectId: currentProjectIndex.seq + 1,
        }).save();
      }
      return createProject;

      //update
    } else {
      const project = await ProjectModel.findOne({
        id_project: projectData.id,
      });
      const missingTask = project.tasks.filter(
        (elementDB) =>
          !projectData.tasks.some(
            (elementUpdate) => elementUpdate.taskId === elementDB.taskId
          )
      );

      for (const task of missingTask) {
        const timeSheet = await TimeSheetModel.findOne({
          projectId: projectData.id,
          taskId: task.taskId,
        });
        if (timeSheet) {
          throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            "Unable to delete logTimeSheet task!"
          );
        }
      }

      await ProjectTargetUserModel.deleteMany({
        projectId: projectData.id,
      });

      await ProjectTaskModel.deleteMany({
        projectId: projectData.id,
      });
      for (const userData of projectData.users) {
        await new ProjectTargetUserModel({
          userId: userData.userId,
          projectId: projectData.id,
          type: userData.type,
        }).save();
      }
      for (const taskData of projectData.tasks) {
        await new ProjectTaskModel({
          taskId: taskData.taskId,
          billable: taskData.billable,
          projectId: projectData.id,
        }).save();
      }

      const updateProject: IProject = await ProjectModel.findOneAndUpdate(
        { id_project: projectData.id },
        { $set: { ...projectData, projectTargetUsers: projectTargetUsers } }
      );

      return updateProject;
    }
  }

  async getAllProject(status: string, search: string) {
    const projects = await ProjectModel.aggregate([
      {
        // inner join customer to project
        $lookup: {
          from: "customers",
          localField: "customerId",
          foreignField: "id_customer",
          as: "customerName",
        },
      },
      // inner join from project to projectTargetUser
      {
        $lookup: {
          from: "projecttargetusers",
          localField: "id_project",
          foreignField: "projectId",
          as: "projectUser",
        },
      },
      {
        $unwind: "$projectUser",
      },
      {
        $match: {
          "projectUser.type": PROJECTUSER_TYPE.PM,
        },
      },
      // inner join user to projectTargetUser
      {
        $lookup: {
          from: "users",
          localField: "projectUser.userId",
          foreignField: "id",
          as: "pms",
        },
      },
      {
        $addFields: {
          customerName: {
            $arrayElemAt: ["$customerName.name", 0],
          },
          pms: {
            $map: {
              input: "$pms",
              as: "user",
              in: "$$user.fullName",
            },
          },
          activeMember: {
            $size: "$users",
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          id: { $first: "$id_project" },
          name: { $first: "$name" },
          code: { $first: "$code" },
          status: { $first: "$status" },
          projectType: { $first: "$projectType" },
          timeStart: { $first: "$timeStart" },
          creationTime: { $first: "$creationTime" },
          customerId: { $first: "$customerId" },
          tasks: { $first: "$tasks" },
          users: { $first: "$users" },
          customerName: { $first: "$customerName" },
          activeMember: { $first: "$activeMember" },
          pms: { $addToSet: "$pms" },
        },
      },
      {
        $match: {
          ...(status ? { status: parseInt(status) } : {}),
          $or: [
            { name: { $regex: `.*${search}.*`, $options: "i" } },
            { customerName: { $regex: `.*${search}.*`, $options: "i" } },
          ],
        },
      },
    ]);

    return projects;
  }

  async projectById(input: number): Promise<IProject> {
    return await ProjectModel.findOne({ id_project: input });
  }

  async deleteProject(id: number): Promise<void> {
    await ProjectModel.findOneAndDelete({ id_project: id });
    await ProjectTargetUserModel.deleteMany({
      projectId: id,
    });
    await ProjectTaskModel.deleteMany({
      projectId: id,
    });
  }
  async inActiveProject(id: number): Promise<void> {
    await ProjectModel.findOneAndUpdate(
      { id_project: id },
      { status: PROJECT_STATUS.DEACTIVE }
    );
  }
  async activeProject(id: number): Promise<void> {
    await ProjectModel.findOneAndUpdate(
      { id_project: id },
      { status: PROJECT_STATUS.ACTIVE }
    );
  }
  async getPMSByProjectId(idProject: number): Promise<object[]> {
    let formated = [];
    const getPMS: IGetPMS[] = await ProjectModel.find({
      id_project: idProject,
    }).populate({
      path: "userTarget",
      match: { type: PROJECTUSER_TYPE.PM },
    });
    for (const pms of getPMS) {
      for (const users of pms.userTarget) {
        const userName = await UserModel.findOne({ id: users.userId });
        formated.push(userName.fullName);
      }
    }

    return formated;
  }

  async projectsIncludingTasks(
    idAccountIsLogging: number
  ): Promise<IProjectResponse[]> {
    const projects: IProjectResponse[] = await ProjectModel.find({
      "users.userId": idAccountIsLogging,
      status: PROJECT_STATUS.ACTIVE,
    })
      .populate("customerName")
      .populate("tasksName")
      .populate("projectTask")
      .populate("projectTargetUser");
    return projects;
  }

  async projectWorkingTimePM(): Promise<IProject[]> {
    const project: IProject[] = await ProjectModel.find().select(
      "id_project name code"
    );
    return project;
  }
}

export = new ProjectRepository();
