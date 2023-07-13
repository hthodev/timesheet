import authenticateRepository from "../repositories/Authenticate";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError";
import httpStatus from "http-status";
require("dotenv").config();
class AuthenticateService {
  async authenticate(userLogin): Promise<string | null> {
    const authenticate = await authenticateRepository.authenticate(userLogin);
    if (authenticate && authenticate.isActive === false) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        "Login fail",
        false,
        "Account has been deactivated!"
      );
    }

    const isChecked: boolean =
      authenticate &&
      (await bcrypt.compareSync(userLogin.password, authenticate.password));
    if (!isChecked) {
      const message = authenticate
        ? "Password wrong"
        : "Account isn't registered";
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Login fail!",
        true,
        message
      );
    }

    const token: string = isChecked
      ? jwt.sign(
          {
            id: authenticate.id,
            userName: authenticate.userName,
            name: authenticate.name,
            surname: authenticate.surname,
            roleNames: authenticate.roleNames,
            isStopWork: authenticate.isStopWork,
          },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        )
      : null;

    return token;
  }
}

export = new AuthenticateService();
