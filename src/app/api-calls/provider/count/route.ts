'use server'
import { cookies } from "next/headers";

const SPRING_BOOT_API_URL = process.env.SPRING_BOOT_API_URL;

export async function getCountOfProviders(): Promise<{[key:string]:string}>{

    if(!SPRING_BOOT_API_URL){
        console.error("back end is not up");
    }

    const cookieStore = await cookies();
    const token =  cookieStore.get('auth-token')?.value;

    const response = await fetch(`${SPRING_BOOT_API_URL}/api/v1/providers/count-all`, {
        method: 'GET',
        credentials: 'include',  // send cookies
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },next:{
            revalidate: 10000,
            tags: ['count of providers']
        }
    });


    if(!response.ok){
        const error = await response.json();
        throw new Error(error.error || 'fetch failed api-> count of providers');
    }

    return response.json();
}
