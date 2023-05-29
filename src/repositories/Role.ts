import { IRole } from "../interfaces/DTO/IRole";
import { IRoleTotal } from "../interfaces/vendors/IResponse";
import { RoleModel } from "../model/roles";
require("dotenv").config();

class RoleRepository {
  async checkRoleError(query: object): Promise<IRole> {
    return await RoleModel.findOne(query);
  }
  async createRole(roleData): Promise<void> {
    await new RoleModel({
      name: roleData.name,
      displayName: roleData.displayName,
      description: roleData.description,
    }).save();
  }

  async getAllPaggingRole(
    keyword: string,
    skipCount: number,
    maxResultCount: number
  ): Promise<IRoleTotal> {
    const roles: IRole[] = await RoleModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { displayName: { $regex: keyword, $options: "i" } },
      ],
    })
      .skip(skipCount)
      .limit(maxResultCount);

    const totalItems: number = await RoleModel.countDocuments();

    return { items: roles, totalCount: totalItems };
  }

  async roleById(Id: number): Promise<IRole> {
    return await RoleModel.findOne({ id_role: Id }).select("-_id -__v");
  }
  async roleUpdate(updateData): Promise<void> {
    await RoleModel.findOneAndUpdate(
      { id_role: updateData.id },
      { $set: { ...updateData } }
    );
  }
  async deleteRole(id: number): Promise<void> {
    await RoleModel.findOneAndDelete({ id_role: id });
  }
}

export = new RoleRepository();
