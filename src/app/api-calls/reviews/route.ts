import { ReviewDto } from "@/dto/ReviewDto";

const API_PREFIX = '/api-calls/auth/apis'

export async function getReviewsByGigId(id: string): Promise<ReviewDto>{
    
        const response =  await fetch(`${API_PREFIX}/api/v1/reviews/by-gig-id?id=${id}`,{
            next: {
                revalidate: 600
            }
        })

        if(!response.ok){
            const error = await response.json();
            throw new Error(error.error || 'fetch failed api->  get review in gig'); 
        }

        return response.json();
    
}