// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;

  // Only protect /site-admin routes
  if (request.nextUrl.pathname.startsWith('/site-admin')) {
    // If no token, redirect to Keycloak login
    if (!token) {
      const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL;
      return NextResponse.redirect(loginUrl!);
    }

    try {
      console.log(token)
      const decoded: any = jwt.decode(token);

      // Adjust this depending on where roles are in your token
      const isAdmin = decoded?.realm_access?.roles?.includes('admin');
      console.log(decoded?.roles);

      if (!isAdmin) {
        console.log("not an admin");
        // Redirect non-admin users to home or an error page
        return NextResponse.redirect(new URL('/', request.url));
        
      }
    } catch (err) {
      console.error('Token decode error:', err);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  

  // Allow /login-callback and other routes
  return NextResponse.next();
}

export const config = {
  matcher: ['/site-admin/:path*'], 
};
