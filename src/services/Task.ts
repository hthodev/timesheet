import projectRepository from "../repositories/Project";
import taskRepository from "../repositories/Task";
import { ApiError } from "../utils/apiError";
import httpStatus from "http-status";
class TaskService {
  async createAndUpdateTask(taskData): Promise<void> {
    await taskRepository.createAndUpdateTask(taskData);
  }

  async getAllTask(): Promise<object[]> {
    const result = await taskRepository.getAllTask();
    const renameIdBranch = result.map((task) => {
      const obj = task.toObject();
      obj.id = obj.id_task;
      delete obj.id_task;
      return obj;
    });
    return renameIdBranch;
  }

  async deleteTask(idQuery): Promise<void> {
    const id: number = idQuery.Id;
    const checkTaskExistsInProject = await projectRepository.checkProjectError({
      "tasks.taskId": id,
    });
    if (checkTaskExistsInProject) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Can't delete existing task in project!"
      );
    }
    const checkTaskExist = await taskRepository.checkTaskError({ id_task: id });
    if (!checkTaskExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "This task isn't existed in the system!"
      );
    }
    if (checkTaskExist.type === 0 && checkTaskExist.isDeleted === false) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Can't delete task type: Common Tasks that are being archived!"
      );
    }
    await taskRepository.deleteTask(id);
  }

  async archiveTask(idQuery): Promise<void> {
    const checkTaskExist = await taskRepository.checkTaskError({
      id_task: idQuery.Id,
    });
    if (!checkTaskExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "This task isn't existed in the system!"
      );
    }
    await taskRepository.archiveTask(idQuery.Id);
  }

  async deArchiveTask(idQuery): Promise<void> {
    const checkTaskExist = await taskRepository.checkTaskError({
      id_task: idQuery.id,
    });

    if (!checkTaskExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "This task isn't existed in the system!"
      );
    }
    await taskRepository.deArchiveTask(idQuery.id);
  }
}

export = new TaskService();
