import { ServiceGigResponseDto } from "@/dto/response/ServiceGigResponseDto";

const SPRING_BOOT_URL = process.env.SPRING_BOOT_API_URL || 'http://localhost:8080';

export async function getGigsById(id:string): Promise<ServiceGigResponseDto>{

    if(!SPRING_BOOT_URL){
        console.error("backend is not up");
    }
  
   const response = await fetch(`${SPRING_BOOT_URL}/api/v1/gig/by-id?id=${id}`,{
    method: 'GET',
     next:{
       revalidate: 100,
       tags: ['gig' , id]
     }
  })

   if (!response.ok) {
    const error = response.statusText;
    throw new Error(error || 'Failed to fetch get gigs by id');
  }


  return response.json()

}