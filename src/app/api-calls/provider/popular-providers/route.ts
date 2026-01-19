'use cache'
import { cacheTag } from "next/cache";
import { ProviderWithCategory } from "@/dto/response/ProviderWithCategoryDto";

const SPRING_BOOT_API_URL = process.env.SPRING_BOOT_API_URL || "http://localhost:8080";


export default async function getPopularProviders(): Promise<ProviderWithCategory[]>{

    if(!SPRING_BOOT_API_URL){
        console.error("back end url didnt load")
    }

    console.log(process.env.SPRING_BOOT_API_URL);

    const response = await fetch(`${SPRING_BOOT_API_URL}/api/v1/providers/top5`, {
        method: "GET",
        headers:{
            'Content-Type': 'application/json',
        },
       next: {
            revalidate: 100,
            tags: ['popular-provider']
       }
       
    });
    
    if(!response.ok){
        const error = await response.json();
        throw new Error(error.error || 'fetch failed api-> popular provider'); 
    }

    cacheTag('popular-provider');

    return response.json();

}