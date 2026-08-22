'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query/keys';
import {
  getActiveGigs,
  getGigsById,
  getRatingOfGigById,
  getCountOfActiveGigs,
} from '@/services/gig.service';
import {
  ServiceGigResponseDto,
  PaginatedServiceGigResponse,
} from '@/dto/response/ServiceGigResponseDto';

/**
 * Clean Architecture Query Hook: Fetch paginated active service gigs (Default: 10 per page)
 */
export function useActiveGigs(page: number = 0, size: number = 10) {
  return useQuery<PaginatedServiceGigResponse, Error>({
    queryKey: queryKeys.gigs.active(page, size),
    queryFn: async () => {
      return await getActiveGigs(page, size);
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Clean Architecture Query Hook: Fetch a single service gig by ID
 */
export function useGigById(id: string) {
  return useQuery<ServiceGigResponseDto, Error>({
    queryKey: queryKeys.gigs.byId(id),
    queryFn: async () => {
      return await getGigsById(id);
    },
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Clean Architecture Query Hook: Fetch average rating and review count for a gig
 */
export function useGigAverageRating(gigId: string) {
  return useQuery<{ average?: string; 'total reviews'?: string; [key: string]: any }, Error>({
    queryKey: queryKeys.gigs.averageRating(gigId),
    queryFn: async () => {
      return await getRatingOfGigById(gigId);
    },
    enabled: Boolean(gigId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Clean Architecture Query Hook: Fetch total active gigs count (admin)
 */
export function useActiveGigsCount() {
  return useQuery<{ 'Count of active gigs': string; [key: string]: string }, Error>({
    queryKey: queryKeys.gigs.countActive,
    queryFn: async () => {
      return await getCountOfActiveGigs();
    },
    staleTime: 1000 * 60 * 2,
  });
}
