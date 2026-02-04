'use server'
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.SPRING_BOOT_API_URL;

export async function LogoutUser(id:string ) {

  const cookieStore = await cookies();

  const token = cookieStore.get('auth-token')?.value;

  try {

    const apiResponse = await fetch(`${BACKEND_URL}/admin/keycloak/users/logout?userId=${id}`,{
      method: "POST",
      headers:{
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })

    if(!apiResponse.ok){
        console.log("from logout ---->"+ apiResponse.status)
    }

    return null
    
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }finally{
    const cookiesToClear = [
      'x-user-name',
      'x-user-email',
      'x-user-roles',
      'x-user-id',
      'auth-token'
    ]

    cookiesToClear.forEach(cookie =>(
      cookieStore.delete(cookie)
    ))

  }
}