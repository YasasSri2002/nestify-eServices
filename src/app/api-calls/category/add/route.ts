import { cookies } from "next/headers";

const SPRING_BOOT_API_URL = process.env.SPRING_BOOT_API_URL;

export async function AddCategory(data:{name:string}): Promise<{[key:string]: string}>{

    const cookieStore =await cookies();
    const token = cookieStore.get('auth-token');

    const response = await fetch(`${SPRING_BOOT_API_URL}/api/v1/category`,{
        cache: 'no-store',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    if(!response.ok){
        const error = await response.json();
        throw new Error(error.error || 'failed api-> Add categories')
    }

    return response.json();
}