import { ProviderDto } from "@/dto/ProviderDto";

export type ProviderPersonalInformation = Omit<ProviderDto , "id" | "jobCount">