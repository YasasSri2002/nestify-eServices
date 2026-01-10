
import { ProviderDto } from "@/dto/ProviderDto";

const SPRING_BOOT_URL = process.env.SPRING_BOOT_API_URL;

export async function getAllProviders():Promise<ProviderDto[]>{
    const response = await fetch(`${SPRING_BOOT_URL}/api/v1/providers/all`,{
        cache: 'no-store'
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch providers');
  }

    return response.json();
}





