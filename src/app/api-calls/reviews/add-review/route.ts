'use server'
import { ReviewRequestDto } from "@/dto/ReviewDto";
import { cookies } from "next/headers";

const SPRING_BOOT_API_URL = process.env.SPRING_BOOT_API_URL;
export async function SendAReview(reviewRequestDto: ReviewRequestDto){

    const cookieStore = await cookies()

    const token = cookieStore.get('auth-token')

    const userId = cookieStore.get('x-user-id');

    console.log(userId)

    if(!userId){
        throw new Error("please log in first") 
    }

    const reviewDto: ReviewRequestDto ={
        clientId: userId?.value,
        comment: reviewRequestDto.comment,
        rating: reviewRequestDto.rating,
        serviceGigId: reviewRequestDto.serviceGigId

    }

    

    const response = await fetch(`${SPRING_BOOT_API_URL}/api/v1/review`,{
        method: 'POST',
        headers: {
            'ContentType': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reviewDto),
        credentials: 'include'
    })

    if(!response.ok){
        throw new Error("not working --> post review" + response.statusText)
    }

    return response.json()

}