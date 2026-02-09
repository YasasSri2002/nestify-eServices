'use server';
import { UserResponseDto } from "@/dto/UserDto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.SPRING_BOOT_API_URL;

export async function getUserById(id:string): Promise<UserResponseDto>{

    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if(!BACKEND_URL){
        console.log(NextResponse.json({
            message: "back end is not up" 
        }))
    }

    const response = await fetch(`${BACKEND_URL}/api/v1/client/by-id?id=${id}`,{
        method: "GET",
        credentials: 'include',
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    if(!response.ok){
        console.log(response.statusText);
    }

    return response.json();

}