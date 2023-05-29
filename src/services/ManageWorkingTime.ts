import jwtDecode from "jwt-decode";
import { IManagerWorkingTimeResponse } from "../interfaces/vendors/IResponse";
import { ITokenDecode } from "../interfaces/vendors/ITokenDecode";
import manageWorkingTimeRepository from "../repositories/ManageWorkingTime";
import { ApiError } from "../utils/apiError";
import httpStatus from "http-status";

class ManageWorkingTimeService {
  async getAll(
    queryFilter: any,
    accountsTokenIsLoggin: string
  ): Promise<IManagerWorkingTimeResponse[]> {
    const accountDecode: ITokenDecode = jwtDecode(accountsTokenIsLoggin);
    const userName: string = queryFilter && queryFilter.userName;
    const status: number | null = queryFilter && queryFilter.status;
    const projectIds: number[] = queryFilter && queryFilter.projectIds;
    let formated = [];
    const workingTimeData: IManagerWorkingTimeResponse[] =
      await manageWorkingTimeRepository.getAll(
        userName,
        status,
        projectIds,
        accountDecode.id
      );
    for (const workingTime of workingTimeData) {
      formated.push({
        ...workingTime,
        fullName:
          workingTime.userNames &&
          workingTime.userNames.find((tn) => tn.id === workingTime.userId)
            .fullName,
        userName:
          workingTime.userNames &&
          workingTime.userNames.find((tn) => tn.id === workingTime.userId)
            .userName,
      });
    }

    return formated;
  }

  async approveWorkingTime(idQuery, accountsTokenIsLoggin: string) {
    const accountDecode: ITokenDecode = jwtDecode(accountsTokenIsLoggin);
    const id: number = idQuery.id;
    const checkExistWorkingTime =
      manageWorkingTimeRepository.checkManagerWorkingTimeError({
        id_workingTime: id,
      });
    if (!checkExistWorkingTime) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Can't found working Time item for update"
      );
    }
    const checkManager: IManagerWorkingTimeResponse =
      await manageWorkingTimeRepository.checkManagerUser({
        id_workingTime: id,
      });

    const getManager: number =
      checkManager &&
      checkManager.userNames &&
      checkManager.userNames.find((tn) => tn.id === checkManager.userId)
        .managerId;
    if (getManager !== accountDecode.id) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "You are not the manager of this requester!"
      );
    }

    await manageWorkingTimeRepository.approveWorkingTime(id);
  }
  async rejectWorkingTime(idQuery, accountsTokenIsLoggin: string) {
    const accountDecode: ITokenDecode = jwtDecode(accountsTokenIsLoggin);
    const id: number = idQuery.id;
    const checkExistWorkingTime =
      manageWorkingTimeRepository.checkManagerWorkingTimeError({
        id_workingTime: id,
      });
    if (!checkExistWorkingTime) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Can't found working Time item for update"
      );
    }
    const checkManager: IManagerWorkingTimeResponse =
      await manageWorkingTimeRepository.checkManagerUser({
        id_workingTime: id,
      });
    const getManager: number =
      checkManager &&
      checkManager.userNames &&
      checkManager.userNames.find((tn) => tn.id === checkManager.userId)
        .managerId;
    if (getManager !== accountDecode.id) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "You are not the manager of this requester!"
      );
    }

    await manageWorkingTimeRepository.rejectWorkingTime(id, accountDecode.id);
  }
}

export = new ManageWorkingTimeService();
