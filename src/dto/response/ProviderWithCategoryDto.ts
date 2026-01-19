
import { CategoryResponseDto } from "../CategoryDto";
import { ProviderDto } from "../ProviderDto";

export interface ProviderWithCategory {
  providerDto: ProviderDto;
  categoriesSet: CategoryResponseDto[];
  reviews: number;
  avgRate: number;
}