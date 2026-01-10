'use cache'
import { cacheTag } from "next/cache";
import { CategoryResponseDto } from "@/dto/CategoryDto";
const SPRING_BOOT_URL = process.env.SPRING_BOOT_API_URL;

export async function getAllCategories(): Promise<CategoryResponseDto[]>{
    const response = await fetch(`${SPRING_BOOT_URL}/api/v1/category/all`,{
        next:{
            revalidate: 36000
        }
    })

    if(!response.ok){
        const error = await response.json();
        throw new Error(error.error || 'failed to fetch api-> get all categories')
    }

    cacheTag('categories');

    return response.json();
}