'use server';

import { CategoryResponseDto } from '@/dto/response/CategoryResponseDto';
import { getValidAuthToken } from './auth.service';

const BACKEND_URL = process.env.SPRING_BOOT_API_URL || 'http://localhost:8080';

/**
 * Fetch all categories from backend.
 * Next.js caching removed — caching is managed by TanStack Query.
 */
export async function getAllCategories(): Promise<CategoryResponseDto[]> {
  const response = await fetch(`${BACKEND_URL}/api/v1/category/all`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  return response.json();
}

/**
 * Add a new category (admin).
 */
export async function AddCategory(categoryName: string) {
  const token = await getValidAuthToken();

  const response = await fetch(`${BACKEND_URL}/api/v1/category`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: categoryName }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Failed to add category: ${response.status} - ${err}`);
  }

  return response.json();
}
