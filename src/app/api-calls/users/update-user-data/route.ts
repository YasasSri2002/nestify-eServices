'use server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { BookingResponseDto } from "@/dto/BookingDto";
import { refreshKeycloakToken } from "../../auth/token-functions/refresh-token/route";
import { IsExpired } from "../../auth/token-functions/is-expired/route";
import { UserRequestDto } from "@/dto/UserDto";
import { UserUpdateData } from "@/types/user";

const BACKEND_URL = process.env.SPRING_BOOT_API_URL || 'http://localhost:8080';


export async function updateUserData(userRequestDto: UserUpdateData){
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
    response = await fetch(`${BACKEND_URL}/api/v1/client/by-id`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(userRequestDto)
    });
  } catch (err) {
    throw new Error(`Network error calling update user api ${err}`);
  }

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`User API failed: ${response.status} - ${errBody}`);
  }

  return response.json();
}