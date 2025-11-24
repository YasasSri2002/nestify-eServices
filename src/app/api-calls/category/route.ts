import { CategoryResponseDto } from "@/dto/CategoryDto";

const API_PREFIX = '/api-calls/auth/apis';

export async function getAllCategories(): Promise<CategoryResponseDto[]>{
    const response = await fetch(`${API_PREFIX}/api/v1/category/all`,{
        cache: 'no-store'
    })

    if(!response.ok){
        const error = await response.json();
        throw new Error(error.error || 'failed to fetch api-> get all categories')
    }

    return response.json();
}