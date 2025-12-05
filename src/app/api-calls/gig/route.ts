import { ServiceGigWithProviderDto } from "@/dto/response/ServiceGigsWithProviderDto";

const API_PREFIX = '/api-calls/auth/apis'; // Routes through Next.js proxy
const SPRING_BOOT_URL = process.env.SPRING_BOOT_API_URL;

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

export async function getActiveGigs():Promise<ServiceGigWithProviderDto[]>{
  const response = await fetch(`${API_PREFIX}/api/v1/gig/active-posters`,{
    cache: 'force-cache'
  })

   if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch active gigs');
  }


  return response.json()
}

export async function getGigsById(id:string): Promise<ServiceGigWithProviderDto>{
  
   const response = await fetch(`${SPRING_BOOT_URL}/api/v1/gig/by-id?id=${id}`,{
    cache: 'force-cache',
    credentials:'include',
  
  })

   if (!response.ok) {
    const error = response.statusText;
    throw new Error(error || 'Failed to fetch get gigs by id');
  }


  return response.json()

}