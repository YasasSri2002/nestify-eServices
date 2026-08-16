'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query/keys';
import { getAllCategories, AddCategory } from '@/services/category.service';
import { CategoryResponseDto } from '@/dto/response/CategoryResponseDto';

/**
 * Clean Architecture Query Hook: Fetch all categories
 */
export function useCategories() {
  return useQuery<CategoryResponseDto[], Error>({
    queryKey: queryKeys.categories.all,
    queryFn: async () => {
      return await getAllCategories();
    },
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });
}

/**
 * Clean Architecture Mutation Hook: Add a category
 * Automatically invalidates category caches upon success.
 */
export function useAddCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryName: string) => {
      return await AddCategory(categoryName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
  });
}
