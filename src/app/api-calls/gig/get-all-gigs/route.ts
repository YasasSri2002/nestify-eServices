import { ServiceGigResponseDto } from "@/dto/response/ServiceGigResponseDto";
const SPRING_BOOT_API_URL = process.env.SPRING_BOOT_API_URL;

export async function getAllPosters(): Promise<ServiceGigResponseDto[]> {
  const response = await fetch(`${SPRING_BOOT_API_URL}/api/v1/gig/all`, {
     next:{
          revalidate: 3600,
          tags: ['all-gigs']
     } 
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch posters');
  }

  return response.json();
}