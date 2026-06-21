'use client';

import { ProfileNavBar } from "./profileNavBar";
import { Suspense } from "react";
import { FullPageLoading } from "@/components/utill/loadingPage";




export default function UserProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gradient-to-b to-surface-ice-200 from-surface-snow via-surface-ice-100">
      <Suspense fallback={<FullPageLoading />}>
        <ProfileNavBar />
        {children}
      </Suspense>
    </div>
  );
}
