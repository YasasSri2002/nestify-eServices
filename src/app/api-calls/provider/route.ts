import { ProviderDto } from "@/dto/ProviderDto";
import { ProviderWithCategory } from "@/dto/response/ProviderWithCategoryDto";

const API_PREFIX = "/api-calls/auth/apis"

export async function getAllProviders():Promise<ProviderDto[]>{
    const response = await fetch(`${API_PREFIX}/api/v1/providers/all`,{
        cache: 'no-store'
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch providers');
  }

    return response.json();
}

export async function getPopularProviders(): Promise<ProviderWithCategory[]>{
    const response = await fetch(`${API_PREFIX}/api/v1/providers/top5`,{
        cache: 'no-store'
    });

    if(!response.ok){
        const error = await response.json();
        throw new Error(error.error || 'fetch failed api-> popular provider'); 
    }

    return response.json();

}

export async function getCountOfProviders(): Promise<{[key:string]:string}>{
    const response = await fetch(`${API_PREFIX}/api/v1/providers/count-all`, {
        method: 'GET',
        credentials: 'include',  // send cookies
        headers: {
            'Content-Type': 'application/json',
        },
    });


    if(!response.ok){
        const error = await response.json();
        throw new Error(error.error || 'fetch failed api-> count of providers');
    }

    return response.json();
}