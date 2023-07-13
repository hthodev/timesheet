import { IRole } from "../interfaces/DTO/IRole";
import roleRepository from "../repositories/Role";
import { ApiError } from "../utils/apiError";
import httpStatus from "http-status";
interface IObj {
  id: number;
  id_role: number;
}
class RoleService {
  async creatRole(roleData): Promise<void> {
    const checkExistOfRoleName = await roleRepository.checkRoleError({
      name: roleData.name,
    });
    if (checkExistOfRoleName) {
      throw new ApiError(
        httpStatus.CONFLICT,
        "Role name is existed in the system!"
      );
    }
    await roleRepository.createRole(roleData);
  }
  async getAllPaggingRole(roleData): Promise<object> {
    const keyword: string = roleData.Keyword;
    const skipCount: number = roleData.SkipCount;
    const maxResultCount: number = roleData.MaxResultCount;
    const result = await roleRepository.getAllPaggingRole(
      keyword,
      skipCount,
      maxResultCount
    );
    const renameIdRole = await result.items.map((item) => {
      const obj = item.toObject();
      obj.id = obj.id_role;
      delete obj.id_role;
      return obj;
    });
    return {
      items: renameIdRole,
      totalCount: result.totalCount,
    };
  }
  async roleById(idQuery): Promise<object> {
    const items: IRole = await roleRepository.roleById(idQuery.Id);
    const renameIdRole: IObj = items.toObject();
    renameIdRole.id = renameIdRole.id_role;
    delete renameIdRole.id_role;

    return { role: renameIdRole };
  }

  async roleUpdate(updateData): Promise<void> {
    const checkExist = await roleRepository.checkRoleError({
      id_role: updateData.id,
    });
    if (!checkExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "This role isn't existed in the system!"
      );
    }
    await roleRepository.roleUpdate(updateData);
  }
  async deleteRole(idQuery): Promise<void> {
    const checkExist = await roleRepository.checkRoleError({
      id_role: idQuery.Id,
    });
    if (!checkExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "This role isn't existed in the system!"
      );
    }
    if (!checkExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "This role isn't existed in the system!"
      );
    }
    await roleRepository.deleteRole(idQuery.Id);
  }
}

export = new RoleService();
