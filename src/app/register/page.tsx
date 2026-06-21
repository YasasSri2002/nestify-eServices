"use client";
import { useState, useEffect } from 'react';

import ClientForm from './Client';
import ProviderForm from './Provider';
import NavBar from '@/components/ui/navbar';

export default function RegisterPage() {
  const [role, setRole] = useState('client');

  useEffect(() => {
    console.log("Selected role:", role);

  }, [role]);

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center lg:m-5 p-5">
        {/* Role Selection Toggle */}
        <div className="w-full rounded-4xl p-5 grid sm:grid-cols-2">
          <div className="grid justify-items-center">
            <button
              onClick={() => setRole('provider')}
              className={`w-full px-4 py-2 rounded-full transition-all ${role === 'provider'
                ? "border-2 border-[#2563EB] shadow-md shadow-[#1D4ED8] bg-[#2563EB] font-medium text-white"
                : " hover:bg-[#2563EB] bg-[#F4F7F7] hover:text-white"
                }`}
            >
              I&apos;m a Provider
            </button>
          </div>

          <div className="grid justify-items-center">
            <button
              onClick={() => setRole('client')}
              className={`w-full px-4 py-2 rounded-full transition-all ${role === 'client'
                ? "border-2 border-[#2563EB] shadow-md shadow-[#1D4ED8] bg-[#2563EB] font-medium text-white"
                : " hover:bg-[#2563EB] bg-[#F4F7F7] hover:text-white"
                }`}
            >
              I Need a Service
            </button>
          </div>
        </div>

        {/* Conditionally Render Imported Forms */}

      </div>


      {role === 'client' && <ClientForm key="client-form" />}
      {role === 'provider' && <ProviderForm key="provider-form" />}

    </>
  );
}