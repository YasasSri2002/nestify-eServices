'use client'
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function decodeState(state: string | null) {
  if (!state) return '/';

  try {
    const parsed = JSON.parse(atob(state));
    return parsed.redirect || '/';
  } catch {
    return '/';
  }
}

export default function LoginCallbackInner() {
  const router = useRouter();
  const params = useSearchParams();



  useEffect(() => {
    const handleCallback = async () => {

      const code = params.get('code');
      const error = params.get('error');
      const state = params.get('state');

      const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL!;
      const redirect = decodeState(state);

      if (error) {
        console.error('Login error:', error);
        router.push(`${loginUrl!}?error=` + encodeURIComponent(error));
        return;
        
      }

      if (!code) {
        router.replace(loginUrl);
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
          router.replace(redirect);
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
  }, [params, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}
