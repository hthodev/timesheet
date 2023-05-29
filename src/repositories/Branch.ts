import { BranchModel } from "../model/branchs";
import { IBranch } from "../interfaces/DTO/IBranch";
import { Document } from "mongoose";
require("dotenv").config();

class BranchRepository {
  async checkBranchError(query: object): Promise<IBranch> {
    return await BranchModel.findOne(query);
  }
  async createBranch(branchData): Promise<void> {
    await new BranchModel({
      ...branchData,
    }).save();
  }

  async allBranchFilter(): Promise<Array<Document & IBranch>> {
    const branchs: IBranch[] = await BranchModel.find();
    return branchs;
  }
}

export = new BranchRepository();
