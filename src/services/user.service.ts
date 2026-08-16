'use server';

import { UserResponseDto, UserData } from '@/dto/UserDto';
import { UserUpdateData } from '@/types/user';
import { getValidAuthToken } from './auth.service';

const BACKEND_URL = process.env.SPRING_BOOT_API_URL || 'http://localhost:8080';

/**
 * Fetch currently authenticated user profile.
 * Next.js caching removed — caching is managed by TanStack Query.
 */
export async function getUserById(): Promise<UserResponseDto> {
  const token = await getValidAuthToken();

  const response = await fetch(`${BACKEND_URL}/api/v1/client/by-id`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.status}`);
  }

  return response.json();
}

/**
 * Update authenticated user profile data.
 */
export async function updateUserData(userData: UserUpdateData) {
  const token = await getValidAuthToken();

  if (!token) {
    throw new Error('Not authenticated');
  }

  const response = await fetch(`${BACKEND_URL}/api/v1/client/by-id`, {
    method: 'PATCH',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`User update failed: ${response.status} - ${errBody}`);
  }

  return response.json();
}

/**
 * Register a new client user.
 */
export async function registerUser(userData: UserData) {
  const response = await fetch(`${BACKEND_URL}/api/v1/client/persist`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`User registration failed: ${response.status} - ${errText}`);
  }

  return response.json();
}

/**
 * Fetch total booking count for a user.
 */
export async function getBookingCountWithUserId(
  userId?: string
): Promise<{ 'Booking Count': string; [key: string]: string }> {
  const token = await getValidAuthToken();

  const response = await fetch(`${BACKEND_URL}/api/v1/booking/user/booking-count`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return { 'Booking Count': '0' };
  }

  return response.json();
}
