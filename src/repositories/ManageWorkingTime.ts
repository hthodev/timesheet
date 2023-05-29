import { IWorkingTime } from "../interfaces/DTO/IWorkingTime";
import { IManagerWorkingTimeResponse } from "../interfaces/vendors/IResponse";
import { WorkingTimeModel } from "../model/workingTimes";

require("dotenv").config();

class ManageWorkingTimeRepository {
  async checkManagerWorkingTimeError(query: object): Promise<IWorkingTime> {
    return await WorkingTimeModel.findOne(query);
  }
  async checkManagerUser(query: object): Promise<IManagerWorkingTimeResponse> {
    return await WorkingTimeModel.findOne(query).populate({
      path: "userNames",
      select: "managerId id",
    });
  }
  async getAll(
    userName: string,
    status: number | null,
    projectIds: number[],
    idOfAccountIsLoggin
  ): Promise<Array<IManagerWorkingTimeResponse>> {
    const workingTimeData: IManagerWorkingTimeResponse[] =
      await WorkingTimeModel.aggregate([
        {
          $lookup: {
            from: "projects",
            localField: "userId",
            foreignField: "users.userId",
            as: "projects",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "id",
            as: "userNames",
          },
        },
        {
          $match: {
            "userNames.fullName": { $regex: `.*${userName}.*`, $options: "i" },
            "userNames.managerId": idOfAccountIsLoggin,
            ...(status !== null && { status }),
            $or:
              projectIds.length > 0
                ? projectIds.map((item) => {
                    return {
                      "projects.id_project": item,
                    };
                  })
                : [{ "projects.id_project": null }],
          },
        },
      ]);
    return workingTimeData;
  }

  async approveWorkingTime(id: number): Promise<void> {
    await WorkingTimeModel.findOneAndUpdate(
      { id_workingTime: id },
      { status: 2 }
    );
  }

  async rejectWorkingTime(
    id: number,
    idOfAccountIsLoggin: number
  ): Promise<string | void> {
    await WorkingTimeModel.findOneAndUpdate(
      { id_workingTime: id },
      { status: 3 }
    );
  }
}

export = new ManageWorkingTimeRepository();
