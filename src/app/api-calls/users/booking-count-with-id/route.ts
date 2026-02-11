'use server'
import { cookies } from "next/headers";


const BACKEND_URL = process.env.SPRING_BOOT_API_URL;

export async function getBookingCountWithUserId(id?: string){   // make id optional
    if (!id) {
        console.log("ID is missing in server action");
        return { error: "id missing" };
    }

    console.log("from the api get booking count", id);

    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if(!BACKEND_URL){
        return { error: "back end url is not set" };
    }

    const response = await fetch(`${BACKEND_URL}/api/v1/booking/user/booking-count?id=${id}`,{
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
