import { Job } from "../JobDto";
import { ProviderDto } from "../ProviderDto";

export interface ProviderWithJobs {
  providerDto: ProviderDto;
  job: Job[];
}