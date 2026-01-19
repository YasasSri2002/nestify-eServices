'use server'
import { ProviderDto } from "@/dto/ProviderDto";
import { cacheLife, cacheTag } from "next/cache";

const SPRING_BOOT_URL = process.env.SPRING_BOOT_API_URL || 'http://localhost:8080';

export async function getAllProviders():Promise<ProviderDto[]>{
'use cache'
    if(!SPRING_BOOT_URL){
        console.error("backed is not up --> get providers All")
    }

    const response = await fetch(`${SPRING_BOOT_URL}/api/v1/providers/all`,{
        next: {
            revalidate: 100,
            tags: ['providers']
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch providers');
  }

  cacheTag('providers')

    return response.json();
}





