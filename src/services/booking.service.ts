'use server';

import { BookingResponseDto } from '@/dto/BookingDto';
import { BookingData } from '@/types/booking';
import { getValidAuthToken } from './auth.service';

const BACKEND_URL = process.env.SPRING_BOOT_API_URL || 'http://localhost:8080';

/**
 * Fetch paginated bookings for the authenticated provider.
 */
export async function getBookingsByProviderId(
  page: number = 0,
  size: number = 10
): Promise<BookingResponseDto[]> {
  const token = await getValidAuthToken();

  if (!token) {
    throw new Error('Not authenticated — please log in');
  }

  const response = await fetch(
    `${BACKEND_URL}/api/v1/booking/by-provider-id?page=${page}&size=${size}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Provider booking fetch failed: ${response.status} - ${errorText}`);
  }

  return response.json();
}

/**
 * Fetch all bookings for current client user.
 */
export async function getBookingDataByClientId(): Promise<BookingResponseDto[]> {
  const token = await getValidAuthToken();

  if (!token) {
    throw new Error('Not authenticated — please log in');
  }

  const response = await fetch(`${BACKEND_URL}/api/v1/booking/by-client-id`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch client bookings: ${response.status} - ${errorText}`);
  }

  return response.json();
}

/**
 * Create a new service booking.
 */
export async function addBooking(bookingData: BookingData): Promise<BookingResponseDto> {
  const token = await getValidAuthToken();

  if (!token) {
    throw new Error('Not authenticated — please log in');
  }

  const response = await fetch(`${BACKEND_URL}/api/v1/booking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Booking API failed: ${response.status} - ${errorBody}`);
  }

  return response.json();
}

/**
 * Cancel a booking by ID.
 */
export async function cancelBooking(taskId: string): Promise<Record<string, any>> {
  const token = await getValidAuthToken();

  if (!token) {
    throw new Error('Not authenticated — please log in');
  }

  const response = await fetch(`${BACKEND_URL}/api/v1/booking/cancel?taskId=${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Booking cancellation failed: ${response.status} - ${errorBody}`);
  }

  return response.json();
}

/**
 * Mark a booking complete by ID.
 */
export async function markBookingComplete(id: string): Promise<Record<string, any>> {
  const token = await getValidAuthToken();

  if (!token) {
    throw new Error('Not authenticated — please log in');
  }

  const response = await fetch(`${BACKEND_URL}/api/v1/booking/completed?id=${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Mark booking complete failed: ${response.status} - ${errorBody}`);
  }

  return response.json();
}

/**
 * Reschedule a booking date and time.
 */
export async function rescheduleTheBooking(
  taskId: string,
  rescheduleDate: string,
  reschduleTime: string
): Promise<Record<string, any>> {
  const token = await getValidAuthToken();

  if (!token) {
    throw new Error('Not authenticated — please log in');
  }

  const response = await fetch(
    `${BACKEND_URL}/api/v1/booking/reschedule?id=${taskId}&rescheduleDate=${rescheduleDate}&rescheduleTime=${reschduleTime}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Reschedule booking failed: ${response.status} - ${errorBody}`);
  }

  return response.json();
}
