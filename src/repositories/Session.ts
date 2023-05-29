import { IUser } from "../interfaces/DTO/Iuser";
import { UserModel } from "../model/users";
require("dotenv").config();

class SessionRepository {
  async session(id): Promise<IUser> {
    return await UserModel.findOne({
      id: id,
    }).select("-password");
  }
}

export = new SessionRepository();
