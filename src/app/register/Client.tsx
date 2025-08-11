"use client";
import { useState } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { LiaWindowCloseSolid } from "react-icons/lia";

export default function ClientForm() {
  return(
          <>
          <div className="flex-col sm:grid sm:grid-cols-2 justify-items-center w-dvw h-[25em] ">
                <div className="col-1  bg-white w-fit">
                   <DotLottieReact
                        src="/animation/real estate.lottie"
                        loop
                        autoplay
                       />
                </div>
                <div className="col-2 justify-items-center content-center bg-gray-200 rounded-3xl w-full ">
                  <div className="w-full flex justify-end relative -top-15 right-5" >
                      <LiaWindowCloseSolid size={34} />
                  </div>
                  <div className="flex justify-evenly my-6 w-full ">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" className="bg-white w-[250px] relative left-7.5  rounded-2xl px-2"/>
                  </div>
                  <div className="flex justify-evenly my-6  w-full">
                    <label htmlFor="address" >Address</label>
                    <input type="text" name="address" className="bg-white w-[250px] relative  left-6 rounded-2xl px-2"/>
                  </div>
                  <div className="flex  justify-evenly my-6 w-full ">
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" className="bg-white w-[250px] relative left-5 rounded-2xl px-2"/>
                  </div>
                  <div className="flex justify-evenly my-6  w-full">
                    <label htmlFor="confirmPss" >Confirm Password</label>
                    <input type="text" name="confirmpass" className="bg-white w-[250px] relative  rounded-2xl px-2"/>
                  </div>
                </div>
              </div>
          </>
  );
}
