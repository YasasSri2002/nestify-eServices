"use client";
import { useState,useEffect } from "react";


import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { LiaWindowCloseSolid } from "react-icons/lia";

export default function ClientForm() {

   // Use state to force remount when switching
  const [animationKey, setAnimationKey] = useState(Date.now());

  // Reset animation when component mounts
  useEffect(() => {
    return () => {
      // Trigger re-render with new key when component unmounts
      setAnimationKey(Date.now());
    };
  }, []);

  return (
      <div className="w-full max-w-[100vw]">
        <div className="flex flex-col sm:grid sm:grid-cols-[1fr_1fr] items-center w-full">
          <div className="w-full flex justify-center bg-white p-4">
            <div className="max-w-full flex flex-col items-center">
              <h2 className="text-xl font-bold">Register as a client</h2>
              <div className="w-full max-w-[750px]">
                <DotLottieReact
                  key={animationKey} // Key forces remount
                  src="/animation/real_estate.lottie"
                  loop
                  autoplay
                  className="sm:w-[600px]"
                />
              </div>
              <div className="mt-4 text-center w-full">
              
              <p className="mt-2">Get things done. Connect with trusted experts instantly.</p>
            </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-3xl p-4 justify-items-center content-center ">
            <div className="w-full flex justify-end relative sm:-top-2 right-3">
              <LiaWindowCloseSolid size={34} />
            </div>
            <div className="flex justify-evenly my-6 w-full ">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                className="bg-white w-[250px] relative left-7.5  rounded-2xl px-2"
              />
            </div>
            <div className="flex justify-evenly my-6  w-full">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                className="bg-white w-[250px] relative  left-6 rounded-2xl px-2"
              />
            </div>
            <div className="flex  justify-evenly my-6 w-full ">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                id="password"
                className="bg-white w-[250px] relative left-5 rounded-2xl px-2"
              />
            </div>
            <div className="flex justify-evenly my-6   w-full">
              <label htmlFor="confirmPass">Confirm Password</label>
              <input
                type="text"
                id="confirmPass"
                className="bg-white w-[250px] relative  rounded-2xl px-2"
              />
            </div>
            <div className="flex mb-2">
              <button className="bg-white rounded-2xl p-2 w-[10em]">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>


  );
}
