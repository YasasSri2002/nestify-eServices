'use server';

import {
  ProviderDto,
  ProviderRegistrationDto,
  ProviderWithAllDetails,
  PaginatedProviderResponse,
} from '@/dto/ProviderDto';
import { ProviderWithCategory } from '@/dto/response/ProviderWithCategoryDto';
import { getValidAuthToken } from './auth.service';

const BACKEND_URL = process.env.SPRING_BOOT_API_URL || 'http://localhost:8080';

/**
 * Fetch paginated providers from Spring Boot backend.
 * Page is 0-indexed on the server, default size is 10.
 */
export async function getAllProviders(
  page: number = 0,
  size: number = 10
): Promise<PaginatedProviderResponse> {
  const response = await fetch(
    `${BACKEND_URL}/api/v1/providers/all?page=${page}&size=${size}`,
    {
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch providers: ${response.status}`);
  }

  return response.json();
}

/**
 * Fetch top 5 popular providers.
 */
export async function getPopularProviders(): Promise<ProviderWithCategory[]> {
  const response = await fetch(`${BACKEND_URL}/api/v1/providers/top5`, {
    method: 'GET',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch popular providers');
  }

  return response.json();
}

/**
 * Fetch provider by ID with full details.
 */
export async function getProviderById(id: string): Promise<ProviderWithAllDetails> {
  const response = await fetch(`${BACKEND_URL}/api/v1/providers/by-id?id=${id}`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch provider by ID: ${response.status}`);
  }

  return response.json();
}

/**
 * Fetch count of all providers (admin).
 */
export async function getCountOfProviders(): Promise<{
  'Provider count': string;
  [key: string]: string;
}> {
  const token = await getValidAuthToken();

  const response = await fetch(`${BACKEND_URL}/api/v1/providers/count-all`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch provider count');
  }

  return response.json();
}

/**
 * Register a new provider.
 */
export async function PersistProvider(providerData: ProviderRegistrationDto) {
  const response = await fetch(`${BACKEND_URL}/api/v1/providers/persist`, {
    method: 'POST',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(providerData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Provider registration failed: ${response.status} - ${errorText}`);
  }

  return response.json();
}
