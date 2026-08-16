'use server'

import { cookies } from "next/headers";
import { refreshKeycloakToken } from "../../auth/token-functions/refresh-token/route";
import { IsExpired } from "../../auth/token-functions/is-expired/route";
import { ProviderBookingPage } from "@/dto/ProviderBookingDto";

const BACKEND_URL = process.env.SPRING_BOOT_API_URL || 'http://localhost:8080';

/**
 * Fetches paginated bookings for the authenticated provider.
 * Backend endpoint: GET /api/v1/booking/by-provider-id?page={page}&size={size}
 */
export async function getBookingsByProviderId(
  page: number = 0,
  size: number = 6
): Promise<ProviderBookingPage> {
  const cookieStore = await cookies();
  let token = cookieStore.get('auth-token')?.value;

  if (!token) {
    throw new Error('Authentication required. Please log in.');
  }

  if (await IsExpired(token)) {
    const newToken = await refreshKeycloakToken();
    if (!newToken) {
      throw new Error('Session expired. Please log in again.');
    }
    token = newToken!;
  }

  let response: Response;

  try {
    response = await fetch(
      `${BACKEND_URL}/api/v1/booking/by-provider-id?page=${page}&size=${size}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    throw new Error(`Network error calling Provider Booking API: ${err}`);
  }

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`Provider Booking API failed: ${response.status} - ${errBody}`);
  }

  return response.json();
}
