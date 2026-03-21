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
        <div>
           <Suspense fallback={<FullPageLoading/>}>
              <ProfileNavBar/>
              {children}
           </Suspense>
        </div>
  );
}
