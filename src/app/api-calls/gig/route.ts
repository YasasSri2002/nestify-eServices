'use server';

import { getValidAuthToken } from '@/services/auth.service';

const BACKEND_URL = process.env.SPRING_BOOT_API_URL || 'http://localhost:8080';

export interface CreateGigPayload {
  title: string;
  description: string;
  categoryId: string;
  basePrice: number;
  priceType: string;
  serviceLocation: string;
  currency: string;
}

export async function createGig(payload: CreateGigPayload): Promise<{ success: boolean; message: string }> {
  const token = await getValidAuthToken();

  if (!token) {
    return { success: false, message: 'Authentication required. Please log in.' };
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/v1/gig`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Create gig failed: ${response.status} - ${errorText}`);
      return { success: false, message: `Failed to create gig: ${response.statusText}` };
    }

    return { success: true, message: 'Gig created successfully!' };
  } catch (err) {
    console.error('Create gig error:', err);
    return { success: false, message: 'An unexpected error occurred. Please try again.' };
  }
}
