import { ProviderWithAllDetails } from "@/dto/ProviderDto";
const SPRING_BOOT_URL =process.env.SPRING_BOOT_API_URL;

export async function getProviderById(id: string): Promise<ProviderWithAllDetails> {

    if(!SPRING_BOOT_URL){
        console.error('back end url is not set up')
    }

    const response = await fetch(
        `${SPRING_BOOT_URL}/api/v1/providers/by-id?id=${id}`,
        {
            method: "GET",
            next: { 
                revalidate: 300, 
                tags: ['provider',id]
            } 
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch provider by id "+ response.status);
    }
    return response.json();
}