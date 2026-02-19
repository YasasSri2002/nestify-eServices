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
    const realm = process.env.KEYCLOAK_REALM;
    const clientId = process.env.KEYCLOAK_CLIENT_ID;
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

      const now = Math.floor(Date.now() / 1000);

    const accessMaxAge =
      decodedToken.exp ? decodedToken.exp - now : tokens.expires_in;

    const refreshMaxAge =
      tokens.refresh_expires_in ?? 60 * 60 * 24; 
    
    // Create response
    const response = NextResponse.json({ success: true });

    console.log("expire time", decodedToken.exp)
    
    // Set auth token as httpOnly cookie (secure)
    response.cookies.set('auth-token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: accessMaxAge,
    });

    if (tokens.refresh_token) {
      response.cookies.set('refresh-token', tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: refreshMaxAge,
        priority: 'high',
      });
    }

    // Set user info cookies (non-httpOnly so client can access)
    response.cookies.set('x-user-id', decodedToken.sub || '', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: accessMaxAge,
    });

    response.cookies.set('x-user-name', decodedToken.name || '', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: accessMaxAge,
    });

    response.cookies.set('x-user-email', decodedToken.email || '', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: accessMaxAge,
    });

    response.cookies.set('x-user-roles', JSON.stringify(decodedToken.realm_access?.roles ?? [ ]),{
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: accessMaxAge,
    });

    

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