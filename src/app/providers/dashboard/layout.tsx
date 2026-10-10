'use client';

import { Suspense } from 'react';
import { FullPageLoading } from '@/components/utill/loadingPage';
import ProviderDashboardNavBar from './providerDashboardNavBar';

export default function ProviderDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-snow via-surface-ice-100 to-surface-ice-200">
      <Suspense fallback={<FullPageLoading />}>
        <ProviderDashboardNavBar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </Suspense>
    </div>
  );
}
