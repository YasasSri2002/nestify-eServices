'use server'
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation";

export async function isTokenExsist(currentPath: string){
    const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL;
    const cookieStore = await cookies();
    
    const token = cookieStore.get('auth-token')?.value;
    if(!token){
         
        const state = btoa(JSON.stringify({ redirect: currentPath }));
        const url = new URL(loginUrl!);
        url.searchParams.set('state', state);

        redirect(url.toString());
    }
    return true
}