'use server'
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export async function isTokenExsist(){
    const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL;
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;
    if(!token){
        redirect(loginUrl!)
    }
    return true
}