import { ProviderRegistrationDto } from "@/dto/ProviderDto";

const BACKEND_URL = process.env.SPRING_BOOT_API_URL || 'http://localhost:8080' ;

export async function PersistProvider(providerData: ProviderRegistrationDto){

    if(!BACKEND_URL){
        console.log("no backend")
    }

    const response = await fetch(`${BACKEND_URL}/api/v1/providers/persist`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(providerData)
    })

    if(!response.ok){
        console.log("err from the provider regstration===>",response.statusText)
    }

    return response.json()

}