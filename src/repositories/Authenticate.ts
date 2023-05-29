import { IUser } from "../interfaces/DTO/Iuser";
import { UserModel } from "../model/users";
require("dotenv").config();

class AuthenticateRepository {
  async authenticate(userLogin): Promise<IUser> {
    const user: any = await UserModel.findOne({
      $or: [
        { userName: userLogin.userNameOrEmailAddress },
        { emailAddress: userLogin.userNameOrEmailAddress },
      ],
    });
    return user;
  }
}

export = new AuthenticateRepository();
