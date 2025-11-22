import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';


interface DecodedToken {
  realm_access?: {
    roles?: string[];
  };
  exp?: number;
  sub?: string;
  name?: string;
  email?: string;
}

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
    const decoded = jwtDecode<DecodedToken>(token);
    
    if(decoded.exp && decoded.exp *1000 < Date.now()){
    
      console.log("Token Expire");
     
      return null
    }

    return decoded

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

  console.log("🔥 Middleware HIT:", request.nextUrl.pathname);

  const token = request.cookies.get('auth-token')?.value;

  const {pathname} = request.nextUrl;

  const decodedToken: any = validateToken(token);

  //check if current url is in the protected route
  if(!checkifProtectedUrl(request,protectedRoutes)){
    return NextResponse.next();
  }
  
  if(!token){
      return handleUnauthorizationEntries(pathname);      
    }

    if(!authorizationForRoutes(pathname,decodedToken)){
      return NextResponse.redirect(new URL('/forbidden',request.url));
    }

      const response = NextResponse.next();
      response.cookies.set('x-user-id', decodedToken.sub || '');
      response.cookies.set('x-user-name', decodedToken.name || '',{ httpOnly: false });
      response.cookies.set('x-user-email', decodedToken.email || '',{ httpOnly: false });
      response.cookies.set('x-user-roles', JSON.stringify(decodedToken.realm_access?.roles || []));

      return response;
}

export const config = {
  matcher: [
      '/site-admin/:path*',
      '/user/profile/:path*',
      '/provider/profile/:path*',
      '/api-calls/:path*'
  ], 
};
