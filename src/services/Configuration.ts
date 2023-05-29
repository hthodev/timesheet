import configurationRepository from "../repositories/Configuration";
import { IBranch } from "../interfaces/DTO/IBranch";
class ConfigurationService {
  async workingTimeConfigAllBranch(): Promise<Array<IBranch>> {
    return await configurationRepository.workingTimeConfigAllBranch();
  }
}

export = new ConfigurationService();
