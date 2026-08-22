'use client';

import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import { queryKeys } from '@/lib/query/keys';
import {
  getAllProviders,
  getPopularProviders,
  getProviderById,
  getCountOfProviders,
  PersistProvider,
} from '@/services/provider.service';
import {
  ProviderDto,
  ProviderRegistrationDto,
  ProviderWithAllDetails,
  PaginatedProviderResponse,
} from '@/dto/ProviderDto';
import { ProviderWithCategory } from '@/dto/response/ProviderWithCategoryDto';

/**
 * Clean Architecture Query Hook: Fetch paginated providers matching Spring Boot backend (pageNumber, pageSize, keyword)
 */
export function useAllProviders(
  pageNumber: number = 0,
  pageSize: number = 10,
  keyword?: string
) {
  return useQuery<PaginatedProviderResponse, Error>({
    queryKey: queryKeys.providers.all(pageNumber, pageSize, keyword),
    queryFn: async () => {
      return await getAllProviders(pageNumber, pageSize, keyword);
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Clean Architecture Query Hook: Fetch top 5 popular providers
 */
export function usePopularProviders() {
  return useQuery<ProviderWithCategory[], Error>({
    queryKey: queryKeys.providers.popular,
    queryFn: async () => {
      return await getPopularProviders();
    },
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Clean Architecture Query Hook: Fetch a single provider by ID
 */
export function useProviderById(id: string) {
  return useQuery<ProviderWithAllDetails, Error>({
    queryKey: queryKeys.providers.byId(id),
    queryFn: async () => {
      return await getProviderById(id);
    },
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Clean Architecture Query Hook: Fetch total provider count (admin)
 */
export function useProvidersCount() {
  return useQuery<{ 'Provider count': string; [key: string]: string }, Error>({
    queryKey: queryKeys.providers.count,
    queryFn: async () => {
      return await getCountOfProviders();
    },
    staleTime: 1000 * 60 * 2,
  });
}

/**
 * Clean Architecture Mutation Hook: Register a new service provider
 */
export function useRegisterProvider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProviderRegistrationDto) => {
      return await PersistProvider(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['providers'] });
    },
  });
}
