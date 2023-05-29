import { TaskModel } from "../model/tasks";
import { ProjectModel } from "../model/projects";
import { ITask } from "../interfaces/DTO/ITask";
import { ApiError } from "../utils/apiError";
import httpStatus from "http-status";
require("dotenv").config();

class TaskRepository {
  async checkTaskError(query: object): Promise<ITask> {
    return await TaskModel.findOne(query);
  }
  async createAndUpdateTask(taskData): Promise<void> {
    const checkIdForCreateOrUpdate = await TaskModel.findOne({
      id_task: taskData.id,
    });
    //create
    if (!checkIdForCreateOrUpdate) {
      const checkExistOfName = await this.checkTaskError({
        name: taskData.name,
      });
      if (checkExistOfName) {
        throw new ApiError(
          httpStatus.CONFLICT,
          "Task Name is existed in the system!"
        );
      }
      await new TaskModel({ ...taskData }).save();
    }
    //update
    else {
      await TaskModel.findOneAndUpdate(
        { id_task: taskData.id },
        { name: taskData.name, type: taskData.type }
      );
    }
  }

  async getAllTask(): Promise<ITask[]> {
    return await TaskModel.find();
  }

  async deleteTask(id: number): Promise<void> {
    await TaskModel.findOneAndDelete({ id_task: id });
  }
  async archiveTask(id: number): Promise<void> {
    await TaskModel.findOneAndUpdate({ id_task: id }, { isDeleted: true });
  }
  async deArchiveTask(id: number): Promise<void> {
    await TaskModel.findOneAndUpdate({ id_task: id }, { isDeleted: false });
  }
}

export = new TaskRepository();
