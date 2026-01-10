
import { ReviewDto } from "@/dto/ReviewDto";

const SPRING_BOOT_URL = process.env.SPRING_BOOT_API_URL;

export async function getReviewsByGigId(id: string): Promise<ReviewDto[]>{
    
        const response =  await fetch(`${SPRING_BOOT_URL}/api/v1/review/by-gig-id?id=${id}`,{
            method: "GET",
            next:{
                revalidate: 300,
                tags: ['reviews']
            }
        })

        if(!response.ok){
            throw (response.status); 
        }

        return response.json();
    
}