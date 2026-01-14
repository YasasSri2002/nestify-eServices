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
    <NavBar/>
    <div className="flex flex-col items-center m-10 p-5">
      {/* Role Selection Toggle */}
      <div className="w-full rounded-4xl p-5 grid sm:grid-cols-2 gap-4">
        <div className="grid justify-items-center">
          <button
            onClick={() => setRole('provider')}
            className={`w-1/2 max-w-m  px-4 py-2 rounded-md transition-all ${
              role === 'provider'
                ? "border-2 border-green-500 shadow-md shadow-green-200 bg-white font-medium rounded-2xl" 
                : " hover:bg-white bg-gray-200"
            }`}
          >
            Service Provider
          </button>
        </div>

        <div className="grid justify-items-center">
          <button
            onClick={() => setRole('client')}
            className={`w-1/2 px-4 py-2 rounded-md transition-all ${
              role === 'client'
                ? "border-2 border-green-500 shadow-md shadow-green-200 bg-white font-medium rounded-2xl" 
                : " hover:bg-gray-100 bg-gray-200"
            }`}
          >
            Client
          </button>
        </div>
      </div>

      {/* Conditionally Render Imported Forms */}
     
    </div>

    
        {role === 'client' && <ClientForm  key="client-form"/>}
        {role === 'provider' && <ProviderForm key="provider-form" />}
      
    </>
  );
}