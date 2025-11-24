import { ProviderDto } from "@/dto/ProviderDto";

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

export async function getPopularProviders(){
    const response = await fetch(`${API_PREFIX}/api/v1/providers/top5`,{
        cache: 'no-store'
    });

    if(!response.ok){
        const error = await response.json();
        throw new Error(error.error || 'fetch failed api-> popular provider'); 
    }

    return response.json();

}