"use client";
import { useState, useEffect, FormEvent } from "react";


import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { LiaWindowCloseSolid } from "react-icons/lia";


function submit(event :FormEvent<HTMLFormElement>){
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  console.log(formData);
}

export default function ProviderForm() {
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
      <div className="max-w-[100vw]">
          <div className="grid lg:grid-cols-2">
            <div className="lg:col-1">
              <div className="max-w-full flex flex-col items-center"> 
                  <h2 className="text-xl font-bold first-letter:uppercase ">register as a service provider</h2>
                  <div className="w-full max-w-187.5"> 
                    <DotLottieReact
                      key={animationKey}
                      src="/animation/Building_and_Construction.lottie"
                      loop
                      autoplay
                      className="sm:w-150"
                    />
                  </div>
                  
                  <div className="mt-4 text-center w-full">
                    <p className="mt-2">Ready to shine? Register as a service provider today!</p>
                  </div>
                </div>
            </div>
            <div className="lg:col-2">
                <div className="w-full bg-gray-200 rounded-3xl p-4 justify-items-center content-center">
                  <div className="w-full flex justify-end relative top-2 right-5">
                    <LiaWindowCloseSolid size={34} />
                  </div>
                  <div className="grid justify-evenly my-6 w-full ">
                      <form onSubmit={submit}>
                        <div className="w-full grid gap-2 sm:gap-3 md:justify-items-center">
                            <div className=" grid sm:flex gap-2 sm:gap-10 w-full">
                              <div className="grid">
                                <label htmlFor="firstName" className="pl-1">First name</label>
                                <input type="text" name="firstName" className="bg-white h-8 sm:w-62.5 rounded-sm p-2"/>
                              </div>
                              <div className="grid">
                                <label htmlFor="lastName" className="pl-1">Last name</label>
                                <input type="text" name="lastName" className="bg-white h-8 sm:w-62.5 rounded-sm  p-2"/>
                              </div>
                            </div>
                            <div className="grid">
                              <label htmlFor="email" className="pl-1">Email</label>
                              <input type="text" name="email" className="bg-white md:w-135 h-8 rounded-sm pl-3"/>
                            </div>
                            <div className="grid">
                              <label htmlFor="username" className="pl-1">Username</label>
                              <input type="text" name="username" className="bg-white md:w-135 h-8 rounded-sm pl-3" />
                            </div>
                            <div className="grid">
                              <label htmlFor="contactNo">Phone Number</label>
                              <div className="flex">
                                <select className="bg-white h-8">
                                  <option value="0">SL(+94)</option>
                                </select>
                                <input type="text" name="contactNo" className="bg-white h-8 rounded-sm pl-2 sm:w-116.5" />
                              </div>
                            </div>
                            <div className="grid">
                              <label htmlFor="password" className="pl-1">Password</label>
                              <input type="text" name="password" className="bg-white md:w-135 h-8 rounded-sm pl-3" />
                            </div>
                            <button type="submit" 
                                className="border sm:hover:bg-white my-5 px-5 py-2 rounded-md 
                                  active:scale-75 duration-150 transition-all active:bg-white md:w-[75%]">
                              Submit
                            </button>
                        </div>
                      </form>
                </div>
            </div>
          </div>
      </div>
      </div>
  );
}
