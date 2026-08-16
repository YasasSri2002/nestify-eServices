'use server';

import { ReviewDto, ReviewRequestDto } from '@/dto/ReviewDto';
import { cookies } from 'next/headers';
import { getValidAuthToken } from './auth.service';

const BACKEND_URL = process.env.SPRING_BOOT_API_URL || 'http://localhost:8080';

/**
 * Fetch all reviews for a gig.
 * Next.js caching removed — caching is managed by TanStack Query.
 */
export async function getReviewsByGigId(id: string): Promise<ReviewDto[]> {
  const response = await fetch(`${BACKEND_URL}/api/v1/review/by-gig-id?id=${id}`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Error from getReviews by gig ID API: ${response.status}`);
  }

  return response.json();
}

/**
 * Submit a new review for a gig/provider.
 */
export async function SendAReview(reviewRequestDto: ReviewRequestDto) {
  const cookieStore = await cookies();
  const token = await getValidAuthToken();
  const userId = cookieStore.get('x-user-id')?.value;

  if (!userId) {
    throw new Error('User ID not found — please log in first');
  }

  if (!token) {
    throw new Error('Auth token not found — please log in first');
  }

  const reviewDto: ReviewRequestDto = {
    clientId: userId,
    comment: reviewRequestDto.comment,
    rating: reviewRequestDto.rating,
    serviceGigId: reviewRequestDto.serviceGigId,
    providerId: reviewRequestDto.providerId,
  };

  const response = await fetch(`${BACKEND_URL}/api/v1/review`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reviewDto),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to post review: ${response.status} - ${errorText}`);
  }

  return await response.json();
}
