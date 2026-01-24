'use server'
import { ReviewRequestDto } from "@/dto/ReviewDto";
import { cookies } from "next/headers";

const SPRING_BOOT_API_URL = process.env.SPRING_BOOT_API_URL;

export async function SendAReview(reviewRequestDto: ReviewRequestDto){
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token');
    const userId = cookieStore.get('x-user-id');
    
    // Debug logs
    console.log('All cookies:', cookieStore.getAll());
    console.log('User ID cookie:', userId);
    console.log('User ID value:', userId?.value);
    
    if(!userId || !userId.value){
        throw new Error("User ID not found - please log in first") 
    }
    
    if(!token || !token.value){
        throw new Error("Auth token not found - please log in first") 
    }
    
    const reviewDto: ReviewRequestDto = {
        clientId: userId.value,
        comment: reviewRequestDto.comment,
        rating: reviewRequestDto.rating,
        serviceGigId: reviewRequestDto.serviceGigId,
        providerId: reviewRequestDto.providerId,
    }
    
    console.log('Sending review with userId:', userId.value);
    
    try {
        const response = await fetch(`${SPRING_BOOT_API_URL}/api/v1/review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify(reviewDto),
            credentials: 'include'
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', errorText);
            throw new Error(`Failed to post review: ${response.status} - ${errorText}`)
        }
        
        return await response.json();
        
    } catch (error) {
        console.error('Error in SendAReview:', error);
        throw error;
    }
}