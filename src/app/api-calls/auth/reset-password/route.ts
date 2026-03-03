'use server';

import { cookies } from "next/headers";
import { IsExpired } from "../token-functions/is-expired/route";
import { refreshKeycloakToken } from "../token-functions/refresh-token/route";

export async function ResetPassword(id:string, password: string){

    const BACKEND_URL = process.env.SPRING_BOOT_API_URL;

    if(!BACKEND_URL){
        console.error("back end didnt properly set in the reset password api or back end isnt up")
    }

    const cookieStore = await cookies();

    let token = cookieStore.get('auth-token')?.value

    const isExpired = await IsExpired(token!)

    if(isExpired){
        const newToken = await refreshKeycloakToken();
        token = newToken!
    }

    console.log(password,"from the api file")

    const response = await fetch(
        `${BACKEND_URL}/admin/keycloak/users/reset-password?userId=${id}&newPassword=${password}`,{
            method: "POST",
            credentials: "include",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

    if(!response.ok){
        console.error(response.body)
    }

    return response.json();

}