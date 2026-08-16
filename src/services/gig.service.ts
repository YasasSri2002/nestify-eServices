'use server';

import { ServiceGigResponseDto } from '@/dto/response/ServiceGigResponseDto';

const BACKEND_URL = process.env.SPRING_BOOT_API_URL || 'http://localhost:8080';

/**
 * Fetch all active gigs.
 * Next.js caching removed — caching is managed by TanStack Query.
 */
export async function getActiveGigs(): Promise<ServiceGigResponseDto[]> {
  const response = await fetch(`${BACKEND_URL}/api/v1/gig/active-posters`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch active gigs');
  }

  return response.json();
}

/**
 * Fetch all gigs.
 */
export async function getAllGigs(): Promise<ServiceGigResponseDto[]> {
  const response = await fetch(`${BACKEND_URL}/api/v1/gig/all`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch all gigs');
  }

  return response.json();
}

/**
 * Fetch a single gig by ID.
 */
export async function getGigsById(id: string): Promise<ServiceGigResponseDto> {
  const response = await fetch(`${BACKEND_URL}/api/v1/gig/by-id?id=${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch gig by ID: ${response.status}`);
  }

  return response.json();
}

/**
 * Fetch average rating and total reviews for a gig.
 */
export async function getRatingOfGigById(
  gigId: string
): Promise<{ average?: string; 'total reviews'?: string; [key: string]: any }> {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/v1/review/average-rate/service-gig?gigId=${gigId}`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      return { average: '0', 'total reviews': '0' };
    }

    return await response.json();
  } catch (err) {
    console.error('Error fetching gig rating:', err);
    return { average: '0', 'total reviews': '0' };
  }
}

/**
 * Fetch total count of active gigs (admin).
 */
export async function getCountOfActiveGigs(): Promise<{
  'Count of active gigs': string;
  [key: string]: string;
}> {
  const response = await fetch(`${BACKEND_URL}/api/v1/gig/count-active-ones`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch count of active gigs');
  }

  return response.json();
}
