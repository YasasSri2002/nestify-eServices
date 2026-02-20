'use server'
import { cookies } from "next/headers";

interface KeycloakTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in?: number;
}

export async function refreshKeycloakToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const storedRefreshToken = cookieStore.get("refresh-token")?.value;
  if (!storedRefreshToken) return null;

  try {
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("client_id", process.env.KEYCLOAK_CLIENT_ID!);
    params.append("client_secret", process.env.KEYCLOAK_CLIENT_SECRET!);
    params.append("refresh_token", storedRefreshToken);

    const url = `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    if (!res.ok) {
      console.error("Failed to refresh token:", await res.text());
      return null;
    }

    const data = (await res.json()) as KeycloakTokenResponse;

    cookieStore.set("auth-token", data.access_token, {
      httpOnly: true,
      path: "/",
      maxAge: data.expires_in,
      secure: process.env.NODE_ENV === "production",
    });
    cookieStore.set("refresh-token", data.refresh_token, {
      httpOnly: true,
      path: "/",
      maxAge: data.refresh_expires_in ?? 86400,
      secure: process.env.NODE_ENV === "production",
    });

    return data.access_token;
  } catch (err) {
    console.error("Error refreshing token:", err);
    return null;
  }
}