'use server';

import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { redirect } from 'next/navigation';

interface KeycloakTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in?: number;
}

const BACKEND_URL = process.env.SPRING_BOOT_API_URL || 'http://localhost:8080';

/**
 * Checks if a JWT token is expired.
 */
export async function IsExpired(token: string): Promise<boolean> {
  if (!token) return true;
  try {
    const decoded = jwtDecode<{ exp?: number }>(token);
    if (!decoded.exp) return true;
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

/**
 * Refreshes Keycloak access token using stored refresh token.
 */
export async function refreshKeycloakToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh-token')?.value;

  if (!refreshToken) return null;

  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('client_id', process.env.KEYCLOAK_CLIENT_ID!);
    params.append('client_secret', process.env.KEYCLOAK_CLIENT_SECRET!);
    params.append('refresh_token', refreshToken);

    const url = `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    });

    if (!res.ok) return null;

    const data: KeycloakTokenResponse = await res.json();

    cookieStore.set('auth-token', data.access_token, {
      httpOnly: true,
      path: '/',
      maxAge: data.expires_in,
      secure: process.env.NODE_ENV === 'production',
    });

    cookieStore.set('refresh-token', data.refresh_token, {
      httpOnly: true,
      path: '/',
      maxAge: data.refresh_expires_in ?? 86400,
      secure: process.env.NODE_ENV === 'production',
    });

    return data.access_token;
  } catch (err) {
    console.error('Failed to refresh token:', err);
    return null;
  }
}

/**
 * Server action to check if a valid token or refreshable session exists.
 */
export async function isTokenExsist(currentPath?: string): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  const refreshToken = cookieStore.get('refresh-token')?.value;

  if (!token && !refreshToken) {
    return false;
  }

  if (token && !(await IsExpired(token))) {
    return true;
  }

  if (refreshToken) {
    const newToken = await refreshKeycloakToken();
    if (newToken) return true;
  }

  return false;
}

/**
 * Helper to obtain a valid auth token.
 */
export async function getValidAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  let token = cookieStore.get('auth-token')?.value;

  if (!token || (await IsExpired(token))) {
    token = (await refreshKeycloakToken()) ?? undefined;
  }

  return token ?? null;
}

/**
 * Resets user password via Keycloak admin endpoint.
 */
export async function ResetPassword(id: string, password: string): Promise<Record<string, any>> {
  const token = await getValidAuthToken();

  const response = await fetch(
    `${BACKEND_URL}/admin/keycloak/users/reset-password?userId=${id}&newPassword=${encodeURIComponent(password)}`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Password reset failed: ${response.status} - ${errorText}`);
  }

  return await response.json();
}

/**
 * Logs out user from Keycloak and clears session cookies.
 */
export async function LogoutUser(id?: string) {
  const cookieStore = await cookies();

  try {
    if (id) {
      await fetch(`${BACKEND_URL}/admin/keycloak/users/logout?userId=${id}`, {
        method: 'POST',
      });
    }
  } catch (err) {
    console.error('Logout error on backend:', err);
  } finally {
    cookieStore.delete('auth-token');
    cookieStore.delete('refresh-token');
    cookieStore.delete('x-user-id');
    cookieStore.delete('x-user-name');
    cookieStore.delete('x-user-email');
    cookieStore.delete('x-user-roles');
  }

  return { success: true };
}
