import { ServiceGigWithProviderDto } from "@/dto/response/ServiceGigsWithProviderDto";

const API_PREFIX = '/api-calls/auth/apis'; // Routes through Next.js proxy

export async function getAllPosters(): Promise<ServiceGigWithProviderDto[]> {
  const response = await fetch(`${API_PREFIX}/api/v1/gig/all`, {
    cache: 'no-store', // Disable caching for dynamic data
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch posters');
  }

  return response.json();
}

export async function getCountOfActiveGigs(): Promise<{[key: string]: string}> {
  const response = await fetch(`${API_PREFIX}/api/v1/gig/count-active-ones`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch gig count');
  }

  return response.json();
}