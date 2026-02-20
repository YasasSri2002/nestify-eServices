import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  realm_access?: { roles?: string[] };
  exp?: number;
  sub?: string;
  name?: string;
  email?: string;
}

interface KeycloakTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in?: number;
}

const protectedRoutes = [
  '/site-admin',
  '/users/profile/',
  '/provider/profile',
];

function encodeState(obj: any) {
  return btoa(JSON.stringify(obj));
}

function hasRole(jwtDecoded: DecodedToken | null, roles: string[]) {
  const accessRoles = jwtDecoded?.realm_access?.roles || [];
  return roles.some(role => accessRoles?.includes(role));
}

function validateToken(token: string) {
  if (!token) return null;
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      console.log("Token Expired");
      return null;
    }
    return decoded;
  } catch (err: unknown) {
    console.log("token error", err);
    return null;
  }
}

function checkifProtectedUrl(request: NextRequest, protectedRoutes: string[]) {
  const { pathname } = request.nextUrl;
  return protectedRoutes.some(route => pathname.startsWith(route));
}

function authorizationForRoutes(pathname: string, decodedToken: DecodedToken | null) {
  if (pathname.startsWith('/users/profile')) {
    return hasRole(decodedToken, ['user', 'admin']);
  }
  if (pathname.startsWith('/site-admin')) {
    return hasRole(decodedToken, ['admin']);
  }
  if (pathname.startsWith('/provider/profile')) {
    return hasRole(decodedToken, ['provider', 'admin']);
  }
  return true;
}

async function refreshToken(refreshToken: string): Promise<KeycloakTokenResponse | null> {
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("client_id", process.env.KEYCLOAK_CLIENT_ID!);
    params.append("client_secret", process.env.KEYCLOAK_CLIENT_SECRET!);
    params.append("refresh_token", refreshToken);

    const url = `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    console.log("Middleware refresh status:", res.status);

    if (!res.ok) {
      console.error("Middleware refresh failed:", await res.text());
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("Middleware refresh error:", err);
    return null;
  }
}

export async function proxy(request: NextRequest) {
  console.log("🔥 Middleware HIT:", request.nextUrl.pathname);

  const token = request.cookies.get('auth-token')?.value;
  const storedRefreshToken = request.cookies.get('refresh-token')?.value;
  const { pathname, search } = request.nextUrl;

  if (!checkifProtectedUrl(request, protectedRoutes)) {
    return NextResponse.next();
  }

  let decodedToken: DecodedToken | null = validateToken(token!);

  // Token expired but we have a refresh token — try to refresh
  if (!decodedToken && storedRefreshToken) {
    const newTokens = await refreshToken(storedRefreshToken);

    if (newTokens) {
      decodedToken = jwtDecode<DecodedToken>(newTokens.access_token);

      if (!authorizationForRoutes(pathname, decodedToken)) {
        return NextResponse.redirect(new URL('/forbidden', request.url));
      }

      // Allow the request and set the new cookies
      const response = NextResponse.next();
      response.cookies.set("auth-token", newTokens.access_token, {
        httpOnly: true,
        path: "/",
        maxAge: newTokens.expires_in,
        secure: process.env.NODE_ENV === "production",
      });
      response.cookies.set("refresh-token", newTokens.refresh_token, {
        httpOnly: true,
        path: "/",
        maxAge: newTokens.refresh_expires_in ?? 86400,
        secure: process.env.NODE_ENV === "production",
      });

      return response;
    }
  }

  // No token and no refresh token — redirect to login
  if (!decodedToken) {
    const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL!;
    const redirectTarget = pathname + search;
    const state = encodeState({ redirect: redirectTarget });
    const url = new URL(loginUrl);
    url.searchParams.set('state', state);
    return NextResponse.redirect(url);
  }

  if (!authorizationForRoutes(pathname, decodedToken)) {
    return NextResponse.redirect(new URL('/forbidden', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/site-admin/:path*',
    '/users/profile/:path*',
    '/provider/profile/:path*',
  ],
};