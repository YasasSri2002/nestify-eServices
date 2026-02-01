'use server'
import { BookingDto, BookingResponseDto } from "@/dto/BookingDto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
const BACKEND_URL = process.env.SPRING_BOOT_API_URL;

export async function getBookingDataByClientId(id:String): Promise<BookingResponseDto[]>{

    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    

    const response =  await fetch(`${BACKEND_URL}/api/v1/booking/by-client-id?id=${id}`,{
        method: "GET",
        headers:{
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })

    if(!response.ok){
        const errStatus = response.statusText;
        const err = response.body
        console.log(NextResponse.json({'errStatus':errStatus, "err body": err}))
    }

    if(!token){
        console.log('please log in first')
        redirect(`/users/profile/${id}`)
        
    }

    return response.json();

}