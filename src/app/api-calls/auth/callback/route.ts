import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  realm_access?: {
    roles?: string[];
  };
  exp?: number;
  sub?: string;
  name?: string;
  email?: string;
  preferred_username?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
    const keycloakUrl = process.env.NEXT_PUBLIC_KEYCLOAK_URL;
    const realm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM;
    const clientId = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID;
    const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET;
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/login-callback`;

    // Exchange authorization code for tokens
    const tokenResponse = await fetch(
      `${keycloakUrl}/realms/${realm}/protocol/openid-connect/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: clientId!,
          client_secret: clientSecret!,
          code,
          redirect_uri: redirectUri,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Token exchange failed:', errorData);
      return NextResponse.json(
        { error: 'Failed to exchange code for token' },
        { status: 400 }
      );
    }

    const tokens = await tokenResponse.json();

    // Decode the access token to get user information
    const decodedToken = jwtDecode<DecodedToken>(tokens.access_token);
    
    // Create response
    const response = NextResponse.json({ success: true });
    
    // Set auth token as httpOnly cookie (secure)
    response.cookies.set('auth-token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: tokens.expires_in,
    });

    // Set user info cookies (non-httpOnly so client can access)
    response.cookies.set('x-user-id', decodedToken.sub || '', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: tokens.expires_in,
    });

    response.cookies.set('x-user-name', decodedToken.name || '', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: tokens.expires_in,
    });

    response.cookies.set('x-user-email', decodedToken.email || '', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: tokens.expires_in,
    });

    response.cookies.set('x-user-roles', JSON.stringify(decodedToken.realm_access?.roles ?? [ ]),{
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: tokens.expires_in,
    });

    // Optional: Store refresh token if needed
    if (tokens.refresh_token) {
      response.cookies.set('refresh-token', tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: tokens.refresh_expires_in || 1800, // Usually 30 mins
      });
    }

    console.log('✅ Cookies set successfully for user:', decodedToken.email);
    
    return response;
  } catch (error) {
    console.error('Token exchange error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}