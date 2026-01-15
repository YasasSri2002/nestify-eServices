"use server"
import { ServiceGigResponseDto } from "@/dto/response/ServiceGigResponseDto";
import { cacheTag,cacheLife } from "next/cache";

const SPRING_BOOT_API_URL = process.env.SPRING_BOOT_API_URL || 'http://localhost:8080';

export async function getActiveGigs():Promise<ServiceGigResponseDto[]>{
"use cache"
    if(!SPRING_BOOT_API_URL){
        console.error("backend isnt up in get active gigs");
    }

  const response = await fetch(`${SPRING_BOOT_API_URL}/api/v1/gig/active-posters`,{
    next: {
      revalidate: 72000,
      tags: ['active-gigs']

    }
  })

    cacheTag('active-gigs')

    cacheLife('hours')

   if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch active gigs');
  }

  

  return response.json()
}