import { Document } from "mongoose";
import { IWorkingTime } from "../interfaces/DTO/IWorkingTime";
import { UserModel } from "../model/users";
import { WorkingTimeModel } from "../model/workingTimes";
import { IUser } from "../interfaces/DTO/Iuser";

require("dotenv").config();

class MyWorkingTimeRepository {
  async checkWorkingTimeError(query: object): Promise<IWorkingTime> {
    return await WorkingTimeModel.findOne(query);
  }

  async myCurrentWorkingTime(id: number): Promise<IUser> {
    return await UserModel.findOne({ id: id }).select(
      "morningWorking morningStartAt morningEndAt afternoonWorking afternoonStartAt afternoonEndAt"
    );
  }
  async allMyHistoryWorkingTime(
    id: number
  ): Promise<Array<Document & IWorkingTime>> {
    return await WorkingTimeModel.find({ userId: id });
  }

  async submitNewWorkingTime(data: any, id: number): Promise<string | void> {
    await new WorkingTimeModel({ ...data, userId: id }).save();
  }

  async editWorkingTime(data: any): Promise<void> {
    await WorkingTimeModel.findOneAndUpdate(
      { id_workingTime: data.id },
      { ...data }
    );
  }
  async deleteWorkingTime(id: number): Promise<string | void> {
    await WorkingTimeModel.findOneAndDelete({ id_workingTime: id });
  }
}

export = new MyWorkingTimeRepository();
