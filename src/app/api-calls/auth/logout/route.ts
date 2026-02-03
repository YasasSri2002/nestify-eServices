import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('Logout: Clearing cookies...');
    
    // Create response
    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );

    // Delete all user-related cookies
    const cookiesToDelete = [
      'x-user-id',
      'x-user-roles', 
      'x-user-email',
      'x-user-roles'
    ];

    cookiesToDelete.forEach(cookieName => {
      // Set cookie to empty with past expiration date
      response.cookies.set(cookieName, '', {
        expires: new Date(0),
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
    });

    console.log('Logout: Cookies cleared successfully');
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}