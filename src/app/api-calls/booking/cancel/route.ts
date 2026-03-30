"use server"

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { IsExpired } from "../../auth/token-functions/is-expired/route";
import { refreshKeycloakToken } from "../../auth/token-functions/refresh-token/route";



const BACKEND_URL = process.env.SPRING_BOOT_API_URL || 'http://localhost:8080';

export async function cancelBooking(id: string){

      const cookieStore = await cookies();
      let token = cookieStore.get('auth-token')?.value;
    
      if (!token) {
        redirect(`/`);
      }
    
      if (await IsExpired(token)) {
        const newToken = await refreshKeycloakToken();
        if (!newToken) {
          redirect(`/`);
        }
        token = newToken!;
      }

    let response: Response;

    try {
        response = await fetch(`${BACKEND_URL}/api/v1/booking/cancel?taskId=${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        });
    } catch (err) {
        throw new Error(`Network error calling booking cancel API: ${err}`);
    }

    if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`Cancel Booking  API failed: ${response.status} - ${errBody}`);
    }

    return response.json();


}