import httpStatus from "http-status";
import jwtDecode from "jwt-decode";
import { ITokenDecode } from "../interfaces/vendors/ITokenDecode";
import myWorkingTimeRepository from "../repositories/MyWorkingTime";
import { ApiError } from "../utils/apiError";
import { IWorkingTime } from "../interfaces/DTO/IWorkingTime";
import { Document } from "mongoose";
import { WORKING_TIME_STATUS } from "../utils/constant";
class MyWorkingTimeService {
  async myCurrentWorkingTime(tokenAccountIsLogging: string): Promise<object> {
    const decode: ITokenDecode = jwtDecode(tokenAccountIsLogging);
    const result = await myWorkingTimeRepository.myCurrentWorkingTime(
      decode.id
    );
    let formated: object = {
      morningStartTime: result.morningStartAt,
      morningEndTime: result.morningEndAt,
      morningWorkingTime: result.morningWorking,
      afternoonStartTime: result.afternoonStartAt,
      afternoonEndTime: result.afternoonEndAt,
      afternoonWorkingTime: result.afternoonWorking,
    };
    return formated;
  }
  async allMyHistoryWorkingTime(
    tokenAccountIsLogging: string
  ): Promise<IWorkingTime[]> {
    const decode: ITokenDecode = jwtDecode(tokenAccountIsLogging);
    const result: Array<Document & IWorkingTime> =
      await myWorkingTimeRepository.allMyHistoryWorkingTime(decode.id);
    const renameId: IWorkingTime[] = result.map((item) => {
      const obj: IWorkingTime = item.toObject();
      obj.id = obj.id_workingTime;
      delete obj.id_workingTime;
      return obj;
    });
    return renameId;
  }
  async submitNewWorkingTime(
    data: any,
    tokenAccountIsLogging: string
  ): Promise<void> {
    const decode: ITokenDecode = jwtDecode(tokenAccountIsLogging);
    const checkExistApplyDate: IWorkingTime =
      await myWorkingTimeRepository.checkWorkingTimeError({
        applyDate: data.applyDate,
      });
    if (checkExistApplyDate) {
      throw new ApiError(
        httpStatus.CONFLICT,
        "Can't request applyDate on same day!"
      );
    }
    await myWorkingTimeRepository.submitNewWorkingTime(data, decode.id);
  }
  async editWorkingTime(data: object): Promise<void> {
    await myWorkingTimeRepository.editWorkingTime(data);
  }
  async deleteWorkingTime(idQuery): Promise<void> {
    const id: number = idQuery.Id;
    const checkExistOfWorkingTime =
      await myWorkingTimeRepository.checkWorkingTimeError({
        id_workingTime: id,
      });
    if (!checkExistOfWorkingTime) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "This Working Time request not exist!"
      );
    }
    if (
      checkExistOfWorkingTime &&
      checkExistOfWorkingTime.status === WORKING_TIME_STATUS.APPROVED &&
      checkExistOfWorkingTime.status === WORKING_TIME_STATUS.REJECTED
    ) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Can't delete approved and rejected items!"
      );
    }
    await myWorkingTimeRepository.deleteWorkingTime(id);
  }
}

export = new MyWorkingTimeService();
