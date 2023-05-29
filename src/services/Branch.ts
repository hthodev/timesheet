import httpStatus from "http-status";
import branchRepository from "../repositories/Branch";
import { ApiError } from "../utils/apiError";
import { IBranch } from "../interfaces/DTO/IBranch";
class BranchService {
  async createBranch(branchData): Promise<void> {
    const checkNameExist = await branchRepository.checkBranchError({
      name: branchData.name,
    });
    if (checkNameExist) {
      throw new ApiError(httpStatus.CONFLICT, "Branch name has already taken!");
    }
    await branchRepository.createBranch(branchData);
  }

  async allBranchFilter(): Promise<Array<IBranch>> {
    const branchs: IBranch[] = await branchRepository.allBranchFilter();
    const renameIdBranch = branchs.map((branch) => {
      const obj: IBranch = branch.toObject();
      obj.id = obj.id_branch;
      delete obj.id_branch;
      return obj;
    });

    return renameIdBranch;
  }
}

export = new BranchService();
