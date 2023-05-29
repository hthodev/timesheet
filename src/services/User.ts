import userRepository from "../repositories/User";
import { ApiError } from "../utils/apiError";
import httpStatus from "http-status";
import { ITokenDecode } from "../interfaces/vendors/ITokenDecode";
import jwtDecode from "jwt-decode";
import path from "path";
import fs from "fs";
import { IUser } from "../interfaces/DTO/Iuser";
import projectRepository from "../repositories/Project";
import bcrypt from "bcrypt";
import { IRole } from "../interfaces/DTO/IRole";
import jwt from "jsonwebtoken";

interface IFilterItem {
  comparison: number;
  propertyName: string;
  value: number;
}

interface IFilterItems {
  filterItems: IFilterItem[];
}
class UserServive {
  async createUser(userData): Promise<void> {
    const checkExistUserName: IUser = await userRepository.checkUserError({
      userName: userData.userName,
    });
    if (checkExistUserName) {
      throw new ApiError(
        httpStatus.CONFLICT,
        `The username you entered already exists!`
      );
    }

    const checkExistEmail: IUser = await userRepository.checkUserError({
      emailAddress: userData.emailAddress,
    });
    if (checkExistEmail) {
      throw new ApiError(
        httpStatus.CONFLICT,
        `The email you entered already exists!`
      );
    }
    const checkValidityRoleName: IUser =
      await userRepository.checkValidityRoleName(userData.roleNames);
    if (checkValidityRoleName === null) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "The role name requested is not in the system!"
      );
    }

    await userRepository.createUser(userData);
  }

  async allUser(): Promise<object> {
    return await userRepository.allUser();
  }
  async allUserPagging(queryData, accountIsLogging: string): Promise<object> {
    const pageSize: number = queryData.maxResultCount;
    const skipCount: number = queryData.skipCount;
    const filterItems: IFilterItem[] = queryData.filterItems;
    const searchText: object = {
      $or: [
        { name: { $regex: queryData.searchText, $options: "i" } },
        { userName: { $regex: queryData.searchText, $options: "i" } },
        { surname: { $regex: queryData.searchText, $options: "i" } },
        { emailAddress: { $regex: queryData.searchText, $options: "i" } },
      ],
    };
    const decode: ITokenDecode = jwt.verify(
      accountIsLogging.split(" ")[1],
      process.env.JWT_SECRET
    );

    const propertyName: string[] = filterItems.map((item) => item.propertyName);
    const value: number[] = filterItems.map((item) => item.value);

    const queryFilterItems: object = propertyName.reduce((acc, cur, idx) => {
      acc[cur] = value[idx];
      return acc;
    }, {});
    // don't get user whose roleName is admin
    queryFilterItems["id"] = { $ne: decode.id };
    const result = await userRepository.allUserPagging(
      queryFilterItems,
      skipCount,
      pageSize,
      searchText
    );
    let formated = [];
    const users: IUser[] = result && result.items;
    for (const user of users) {
      const projectUsers = [];
      for (const item of user.projectUsers) {
        const pms = await projectRepository.getPMSByProjectId(item.id_project);
        const projectType =
          item.users && item.users.find((tn) => tn.userId === user.id).type;
        projectUsers.push({
          projectName: item.name,
          projectCode: item.code,
          projectType: projectType,
          pms: pms,
        });
      }
      formated.push({
        ...user.toObject(),
        projectUsers: projectUsers,
      });
    }
    return { items: formated, totalCount: result.totalCount };
  }

  async updateUser(updateData): Promise<void> {
    const checkExist = await userRepository.checkUserError({
      id: updateData.id,
    });
    if (!checkExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Account is not existed!");
    }
    await userRepository.updateUser(updateData);
  }

  async allUserNotPagging(): Promise<IUser[]> {
    return await userRepository.allUserNotPagging();
  }

  async allManager(): Promise<IUser[]> {
    return await userRepository.allManager();
  }

  async changeRoleUser(updateData): Promise<void> {
    const checkExist = await userRepository.checkUserError({
      id: updateData.userId,
    });
    if (!checkExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `The user you requested isn't exist!`
      );
    }
    await userRepository.changeRoleUser(updateData);
  }

  async updateRoleUser(updateData): Promise<void> {
    const checkExist = await userRepository.checkUserError({
      id: updateData.userId,
    });
    if (!checkExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `The user you requested isn't exist!`
      );
    }
    await userRepository.updateRoleUser(updateData);
  }
  async getByIdUser(idQuery): Promise<IUser> {
    const id: number = idQuery.Id;
    return await userRepository.getByIdUser(id);
  }

  async getRoleUser(): Promise<IRole[]> {
    return await userRepository.getRoleUser();
  }
  async deleteUser(idQuery): Promise<void> {
    const checkUserIsInProject = await projectRepository.checkProjectError({
      "users.userId": idQuery.Id,
    });
    if (checkUserIsInProject) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Can't delete user is in project"
      );
    }

    await userRepository.deleteUser(idQuery);
  }

  async changePasswordUser(infoAdmin, passwordData): Promise<void> {
    const infoAdminDecode: ITokenDecode = jwtDecode(infoAdmin);
    const checkExistAdminAccount = await userRepository.checkUserError({
      id: infoAdminDecode.id,
    });
    if (!checkExistAdminAccount) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `Admin's Account isn't exist in the system!`
      );
    }
    const checkUserExist = await userRepository.checkUserError({
      id: passwordData.userId,
    });
    if (!checkUserExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "The user's account is resetting the password doesn't exist"
      );
    }
    const checkPasswordAdmin = await bcrypt.compareSync(
      passwordData.adminPassword,
      checkExistAdminAccount.password
    );

    if (checkPasswordAdmin === false) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Admin's password is incorrect! "
      );
    }
    await userRepository.changePasswordUser(passwordData);
  }

  async deactiveUser(idQuery): Promise<void> {
    const id: number = idQuery.id;
    const checkExist = await userRepository.checkUserError({ id: id });
    if (!checkExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `The user you requested isn't exist!`
      );
    }
    await userRepository.deactiveUser(id);
  }

  async activeUser(idQuery): Promise<void> {
    const id: number = idQuery.id;
    const checkExist = await userRepository.checkUserError({ id: id });
    if (!checkExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `The user you requested isn't exist!`
      );
    }
    await userRepository.activeUser(id);
  }

  async updateImageUser(id, image): Promise<string> {
    const checkExist = await userRepository.checkUserError({ id: id });
    if (!checkExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `The user you requested isn't exist!`
      );
    }
    return await userRepository.updateImageUser(id, image);
  }

  async imageUser(params) {
    const pathImg = path.join(__dirname, "../assets/avatars", params.name);
    const img = await fs.readFileSync(pathImg);
    return img;
  }
}

export = new UserServive();
