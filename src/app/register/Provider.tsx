"use client";
import { useState } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { LiaWindowCloseSolid } from "react-icons/lia";

export default function ProviderForm() {
  return(
        <>
         
          <div className="flex-col sm:grid sm:grid-cols-2 justify-items-center w-dvw">
               <h1 className="text-2xl">Register As A Service Provider</h1>
                <div className="col-1  bg-white w-fit">
                   <DotLottieReact
                        src="/animation/Building and Construction.lottie"
                        loop
                        autoplay
                       />
                </div>
                <div className="col-2 justify-items-center content-center bg-gray-300 w-full rounded-3xl">
                  <div className="w-full flex justify-end relative top-2 right-5">
                      <LiaWindowCloseSolid size={34} />
                  </div>
                  <div className="flex justify-evenly my-6 w-full ">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" className="bg-white w-[250px] relative left-8  rounded-2xl px-2"/>
                  </div>
                  <div className="flex justify-evenly my-6  w-full">
                    <label htmlFor="contact" >Contact No</label>
                    <input type="text" name="contact" className="bg-white w-[250px] relative  left-5 rounded-2xl px-2"/>
                  </div>
                  <div className="flex  justify-evenly my-6 w-full ">
                    <label htmlFor="experties">Experties</label>
                    <input type="text" name="experties" className="bg-white w-[250px] relative left-6 rounded-2xl px-2"/>
                  </div>
                  <div className="flex  justify-evenly my-6 w-full ">
                    <label htmlFor="hourlyRate">Hourly Rate</label>
                    <input type="text" name="hourlyRate" className="bg-white w-[250px] relative left-5 rounded-2xl px-2"/>
                  </div>
                  <div className="flex  justify-evenly my-6 w-full ">
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" className="bg-white w-[250px] relative left-6 rounded-2xl px-2"/>
                  </div>
                  <div className="flex justify-evenly my-6  w-full">
                    <label htmlFor="confirmPss" >Confirm Password</label>
                    <input type="text" name="confirmpass" className="bg-white w-[250px] relative left-1  rounded-2xl px-2"/>
                  </div>
                  <div className="flex mb-2">
                    <button className="bg-white rounded-2xl p-2 w-[10em]">Login</button>
                  </div>
                </div>
              </div>
          </>
  );
}
