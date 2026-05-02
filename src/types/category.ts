import { CategoryResponseDto } from "@/dto/CategoryDto";

export type CategoryContextType = {
  categories: CategoryResponseDto[];
  loading: boolean;
};