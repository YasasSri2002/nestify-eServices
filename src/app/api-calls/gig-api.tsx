import { ServiceGigWithProviderDto } from "@/dto/response/ServiceGigsWithProviderDto";
import axios from "axios";


export async function getAllPosters(){
    const response = await axios.get<ServiceGigWithProviderDto[]>(
        'http://localhost:8080/api/v1/gig/all'
    )
    return response.data
}

export async function getCountOfActiveGigs(){
    const response = await axios.get('http://localhost:8080/api/v1/gig/count-active-ones'
        ,{
            headers: {
                'Authorization': `Bearer`
            }
        })
    return response.data
}