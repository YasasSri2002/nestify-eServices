'use server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


import { refreshKeycloakToken } from "../../auth/token-functions/refresh-token/route";
import { IsExpired } from "../../auth/token-functions/is-expired/route";
import { BookingRequestDto } from "@/dto/BookingDto";

const BACKEND_URL = process.env.SPRING_BOOT_API_URL || 'http://localhost:8080';


export async function addBooking(bookingRequestDto: BookingRequestDto) {
  const cookieStore = await cookies();
  let token = cookieStore.get('auth-token')?.value;

  if (!token) {
    return { error: "UNAUTHORIZED" };
  }

  if (await IsExpired(token!)) {
    const newToken = await refreshKeycloakToken();
    if (!newToken) {
      redirect(`/`);
    }
    token = newToken!;
  }

  // Keep the fetch in its own try/catch, separate from redirect logic
  let response: Response;

  try {
    response = await fetch(`${BACKEND_URL}/api/v1/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(bookingRequestDto)
    });
  } catch (err) {
    throw new Error(`Network error calling Booking API: ${err}`);
  }

  if (!response.ok) {
    let message = "Booking failed";

    try {
      const errJson = await response.json();
      message = errJson?.message || message;
    } catch {
      message = "Unexcepted Error"
    }

    throw new Error(`Booking API failed: ${response.status} - ${message}`);
  }

  return response.json();
}