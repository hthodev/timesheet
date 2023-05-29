import httpStatus from "http-status";
import sessionRepository from "../repositories/Session";
import { ApiError } from "../utils/apiError";
import userRepository from "../repositories/User";
import { ITokenDecode } from "../interfaces/vendors/ITokenDecode";
import jwtDecode from "jwt-decode";
import { IUser } from "../interfaces/DTO/Iuser";

class SessionService {
  async session(userToken): Promise<IUser> {
    const userDecode: ITokenDecode = jwtDecode(userToken);

    const checkExistUser = await userRepository.checkUserError({
      id: userDecode.id,
    });
    if (!checkExistUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Account does not exist!");
    }
    return await sessionRepository.session(userDecode.id);
  }
}

export = new SessionService();
