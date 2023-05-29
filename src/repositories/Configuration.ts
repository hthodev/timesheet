import { Document } from "mongoose";
import { IBranch } from "../interfaces/DTO/IBranch";
import { BranchModel } from "../model/branchs";
require("dotenv").config();

class ConfigurationRepository {
  async workingTimeConfigAllBranch(): Promise<Array<Document & IBranch>> {
    return await BranchModel.find();
  }
}

export = new ConfigurationRepository();
