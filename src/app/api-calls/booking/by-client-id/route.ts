'use server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { BookingResponseDto } from "@/dto/BookingDto";
import { refreshKeycloakToken } from "../../auth/token-functions/refresh-token/route";
import { IsExpired } from "../../auth/token-functions/is-expired/route";

const BACKEND_URL = process.env.SPRING_BOOT_API_URL || 'http://localhost:8080';


export async function getBookingDataByClientId(id: string): Promise<BookingResponseDto[]> {
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

  // Keep the fetch in its own try/catch, separate from redirect logic
  let response: Response;

  try {
    response = await fetch(`${BACKEND_URL}/api/v1/booking/by-client-id?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  } catch (err) {
    throw new Error(`Network error calling Booking API: ${err}`);
  }

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`Booking API failed: ${response.status} - ${errBody}`);
  }

  return response.json();
}