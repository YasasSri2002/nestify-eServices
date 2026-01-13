import { ServiceGigResponseDto } from "@/dto/response/ServiceGigResponseDto";

const SPRING_BOOT_API_URL = process.env.SPRING_BOOT_API_URL;

export async function getActiveGigs():Promise<ServiceGigResponseDto[]>{

    if(!SPRING_BOOT_API_URL){
        console.error("backend isnt up");
    }

  const response = await fetch(`${SPRING_BOOT_API_URL}/api/v1/gig/active-posters`,{
    next: {
        revalidate: 7200,
        tags: ['active-gigs']
    }
  })

   if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch active gigs');
  }


  return response.json()
}