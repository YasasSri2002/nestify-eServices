'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query/keys';
import { getReviewsByGigId, SendAReview } from '@/services/review.service';
import { ReviewDto, ReviewRequestDto } from '@/dto/ReviewDto';

/**
 * Clean Architecture Query Hook: Fetch reviews for a specific gig
 */
export function useGigReviews(gigId: string) {
  return useQuery<ReviewDto[], Error>({
    queryKey: queryKeys.reviews.byGigId(gigId),
    queryFn: async () => {
      return await getReviewsByGigId(gigId);
    },
    enabled: Boolean(gigId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Clean Architecture Mutation Hook: Add a new review
 * Automatically invalidates the gig's reviews and rating queries upon success.
 */
export function useAddReview(gigId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewDto: ReviewRequestDto) => {
      return await SendAReview(reviewDto);
    },
    onSuccess: (_, variables) => {
      const targetGigId = gigId ?? variables.serviceGigId;
      if (targetGigId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.reviews.byGigId(targetGigId),
        });
        queryClient.invalidateQueries({
          queryKey: queryKeys.gigs.averageRating(targetGigId),
        });
      }
    },
  });
}
