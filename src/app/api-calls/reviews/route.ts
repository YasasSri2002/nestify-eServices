
import { ReviewDto } from "@/dto/ReviewDto";


const API_PREFIX = "/api-calls/auth/apis";
const SPRING_BOOT_URL = process.env.SPRING_BOOT_API_URL;

export async function getReviewsByGigId(id: string): Promise<ReviewDto[]>{
    
        const response =  await fetch(`http://localhost:3000/${API_PREFIX}/api/v1/review/by-gig-id?id=${id}`)

        if(!response.ok){
            throw (response.status); 
        }

        return response.json();
    
}