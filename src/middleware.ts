// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

 const protectedRoutes =[
    '/site-admin',
    '/user/profile',
    '/provider/profile',
  ]

function hasRole(jwtDecoded: any , roles: string[]){
    const accessRoles = jwtDecoded?.realm_access?.roles || [];
    return roles.some(role => accessRoles?.includes(role));
  }

function validateToken(token: any){
  if(!token) return null;

  try{
    return jwt.decode(token);
  }catch(err:any){
    console.log("token error",err)
    return null;
  }
 
}

function checkifProtectedUrl(request: NextRequest, protectedRoutes: string[]){
  const {pathname} = request.nextUrl;
  return protectedRoutes.some(route=>pathname.startsWith(route));

}

function handleUnauthorizationEntries(pathname: any){
      const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL;
      const redirectUrl = new URL(loginUrl!);
      redirectUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(redirectUrl);
}

function authorizationForRoutes(pathname: any , decodedToken:any){
   if(pathname.startsWith('/user/profile')){
          return  hasRole(decodedToken,['user','admin']);
    }
    if(pathname.startsWith('/site-admin')){
      return  hasRole(decodedToken,['admin']);
    }
    if(pathname.startsWith('/provider/profile')){
      return  hasRole(decodedToken,['provider','admin']);
    }
    return true;
}



export function middleware(request: NextRequest) {

  const token = request.cookies.get('auth-token')?.value;

  const {pathname} = request.nextUrl;

  const decoded: any = validateToken(token);

  //check if current url is in the protected route
  if(!checkifProtectedUrl(request,protectedRoutes)){
    return NextResponse.next();
  }
  
  if(!token){
      return handleUnauthorizationEntries(pathname);      
    }

    if(!authorizationForRoutes(pathname,decoded)){
      return NextResponse.redirect(new URL('/forbidden',request.url));
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
