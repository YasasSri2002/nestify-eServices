// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { NextURL } from 'next/dist/server/web/next-url';
import next from 'next';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const {pathname} = request.nextUrl;

  const protectedRoutes =[
    '/site-admin',
    '/user/profile',
    'provider/profile',
  ]

  //check if current url is in the protected route
  const isProtectedUrl = protectedRoutes.some(route=>pathname.startsWith(route));

  if(isProtectedUrl){

    if (!token) {
      const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL;
      
      const redirectUrl = new URL(loginUrl!)
      redirectUrl.searchParams.set('redirect',pathname);
      return NextResponse.redirect(redirectUrl);
    }

    const decoded: any = jwt.decode(token);
    
  if (pathname.startsWith('/site-admin')) {

        try {
          //check if user is a admin
          const isAdmin = decoded?.realm_access?.roles?.includes('admin');

          if (!isAdmin) {           
            // Redirect non-admin users to home or an error page
            //TODO: make a forbidden page 403 Error page
            return NextResponse.redirect(new URL('/', request.url));
            
          }

        } catch (err) {
          console.error('Token decode error:', err);
          return NextResponse.redirect(new URL('/', request.url));
        }
    }

    if(pathname.startsWith('user/profile')){
        try{
          const isUser = decoded?.realm_access?.roles?.includes('user','admin');
          if(!isUser){
            //TODO: make a 403 forbidden Page
            return NextResponse.redirect(new URL('/',request.url));
          }

        }catch(err){
            console.log(err);
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    if(pathname.startsWith('provider')){
        try{
          const isProvider = decoded?.realm_access?.roles?.includes('provider','admin');
          if(!isProvider){
            //TODO: make a 403 forbidden page
            return NextResponse.redirect(new URL('/',request.url));
          }
        }catch(err){
          console.log(err);
          return NextResponse.redirect(new URL('/',request.url))
        }
    }

  }
  // Allow /login-callback and other routes
  return NextResponse.next();
}

export const config = {
  matcher: [
      '/site-admin/:path*',
      '/user/profile/:path*',
      '/provider/profile/:path*'
  ], 
};
