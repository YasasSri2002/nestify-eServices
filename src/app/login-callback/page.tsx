'use client'
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const error = searchParams.get('error');
      const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL;

      // Handle login error from OAuth provider
      if (error) {
        console.error('Login error:', error);
        router.push(`${loginUrl!}?error=` + encodeURIComponent(error));
        return;
      }

      // No code provided, redirect to login
      if (!code) {
        router.replace(loginUrl!);
        return;
      }

      try {
        // Exchange code for token
        const response = await fetch('/api-calls/auth/callback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });

        if (response.ok) {
          // Successful authentication, redirect to home page
          router.push('/site-admin');
        } else {
          // Safely handle non-JSON responses
          let errorData: any = {};
          const contentType = response.headers.get('content-type');

          if (contentType?.includes('application/json')) {
            errorData = await response.json();
          } else {
            errorData = { message: await response.text() };
          }

          console.error('Authentication failed:', errorData);
          router.push(loginUrl!+'?error=authentication_failed');
        }
      } catch (err) {
        console.error('Callback network error:', err);
        router.push(loginUrl!+'?error=network_error');
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}
