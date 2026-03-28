'use server'
import { cookies } from "next/headers";


const BACKEND_URL = process.env.SPRING_BOOT_API_URL;

export async function getBookingCountWithUserId(){   // make id optional
   

    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if(!BACKEND_URL){
        return { error: "back end url is not set" };
    }

    const response = await fetch(`${BACKEND_URL}/api/v1/booking/user/booking-count`,{
        method: "GET",
        credentials: 'include',
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if(!response.ok){
        return { error: "fetch failed" };
    }

    return response.json();
}
