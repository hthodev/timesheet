import { UserModel } from "../model/users";
import { hashPassword } from "../utils/hashPassword";
import bcrypt from "bcrypt";
import { ITokenDecode } from "../interfaces/vendors/ITokenDecode";
import { RoleModel } from "../model/roles";
import { ProjectModel } from "../model/projects";
import { CountModel } from "../model/counter";
import { IUser } from "../interfaces/DTO/Iuser";
import { IUserTotal } from "../interfaces/vendors/IResponse";
import { ICounter } from "../interfaces/DTO/ICounter";
import { IProject } from "../interfaces/DTO/IProject";
import { IRole } from "../interfaces/DTO/IRole";

class UserRepository {
  async checkUserError(query: object): Promise<IUser> {
    const checkExistUser: IUser = await UserModel.findOne(query);
    return checkExistUser;
  }
  async checkValidityRoleName(roleNames): Promise<IUser> {
    for (const roleName of roleNames) {
      const UpperCaseRoleNames = roleName && roleName.toUpperCase();
      // check the roleName from request exists on roles table
      const checkValidityRoleName: IUser = await RoleModel.findOne({
        normalizedName: UpperCaseRoleNames,
      });
      return checkValidityRoleName;
    }
  }
  async createUser(userData): Promise<void> {
    const indexUser: ICounter = await CountModel.findOne({ id: "id" }).select(
      "seq"
    );
    //check project have isAllUserBelongTo
    const isAllUserBelongTo: IProject[] = await ProjectModel.find({
      isAllUserBelongTo: true,
    });
    isAllUserBelongTo.map(async (item) => {
      await ProjectModel.findOneAndUpdate(
        { id_project: item.id_project },
        {
          $push: {
            users: {
              userId: indexUser.seq + 1,
              type: 0,
            },
          },
        }
      );
    });

    await new UserModel({
      ...userData,
      password: await hashPassword(userData.password),
      isActive: userData.isActive,
      roleNames: userData.roleNames.map((roleName) => roleName.toUpperCase()),
      fullName: `${userData.name} ${userData.surname}`,
    }).save();
  }

  async allUser(): Promise<IUserTotal> {
    const items: IUser[] = await UserModel.find({
      roleNames: { $in: ["BasicUser", "ProjectAdmin"], $nin: ["Admin"] },
    }).select("-password -_id -__v");
    const totalUser: number = await UserModel.countDocuments();
    return { totalCount: totalUser, items: items };
  }

  async allUserPagging(
    queryFilterItems: object,
    skipCount: number,
    pageSize: number,
    searchText: object
  ): Promise<IUserTotal> {
    const query = {
      ...queryFilterItems,
      ...searchText,
    };

    const userDataWithinPagging: IUser[] = await UserModel.find(query)
      .populate({ path: "projectUsers", select: "name code users id_project" })
      .select("-password")
      .skip(skipCount)
      .limit(pageSize);

    const totalUser: number = await UserModel.countDocuments(query);
    return {
      totalCount: totalUser,
      items: userDataWithinPagging,
    };
  }

  async updateUser(updateData): Promise<void> {
    await UserModel.findOneAndUpdate(
      { id: updateData.id },
      {
        $set: { ...updateData },
      }
    );
  }

  async allUserNotPagging(): Promise<IUser[]> {
    const userDataWithoutPagging: IUser[] = await UserModel.find({
      roleNames: {
        $in: ["BASICUSER", "PROJECTADMIN", "HR MANAGER", "SUPERVISOR"],
        $nin: ["ADMIN"],
      },
    }).select(
      "name emailAddress isActive type jobTitle level userCode avatarPath avatarFullPath branch branchColor branchDisplayName branchId id"
    );

    return userDataWithoutPagging;
  }

  async allManager(): Promise<IUser[]> {
    const managerData: IUser[] = await UserModel.find({
      roleNames: { $in: ["MANAGER"], $nin: ["ADMIN"] },
    }).select(
      "avatarFullPath avatarPath branch branchColor branchDisplayName branchId emailAddress id isActive jobTitle level name type userCode"
    );

    return managerData;
  }

  async changeRoleUser(dataUpdate): Promise<void> {
    if (dataUpdate.role) {
      dataUpdate.role = dataUpdate.role.toUpperCase();
    }
    await UserModel.findOneAndUpdate(
      { id: dataUpdate.userId },
      { roleNames: await [dataUpdate.role] }
    ).select("-password -_id -__v");
  }

  async updateRoleUser(dataUpdate): Promise<void> {
    await UserModel.findOneAndUpdate(
      { id: dataUpdate.id },
      { roleNames: dataUpdate.role }
    ).select("-password -_id -__v");
  }
  async getByIdUser(id): Promise<IUser> {
    const userById = await UserModel.findOne({ id: id }).select(
      "-password -_id -__v"
    );
    return userById;
  }

  async getRoleUser(): Promise<IRole[]> {
    const roleNames: IRole[] = await RoleModel.find();
    return roleNames;
  }

  async deleteUser(idQuery): Promise<void> {
    await UserModel.findOneAndDelete({ id: idQuery.Id });
  }

  async changePasswordUser(passwordData): Promise<void> {
    await UserModel.findOneAndUpdate(
      { id: passwordData.userId },
      {
        password: await hashPassword(passwordData.newPassword),
      }
    );
  }

  async deactiveUser(id: number): Promise<void> {
    await UserModel.findOneAndUpdate({ id: id }, { isActive: false });
  }
  async activeUser(id: number): Promise<void> {
    await UserModel.findOneAndUpdate({ id: id }, { isActive: true });
  }

  async updateImageUser(id: number, avatarPath: string): Promise<string> {
    await UserModel.updateOne(
      { id: id },
      { avatarPath: "/avatars/" + avatarPath }
    );
    return "/avatars/" + avatarPath;
  }
}

export = new UserRepository();
