"use client";
import { useState, useEffect, FormEvent } from "react";


import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { LiaWindowCloseSolid } from "react-icons/lia";
import axios from "axios";

function submit(event :FormEvent<HTMLFormElement>){
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
}

export default function ProviderForm() {
  // Use state to force remount when switching
  const [animationKey, setAnimationKey] = useState(Date.now());
  const [registerProvider, setRegisterPrvider] =useState({
    email:"",
    username:"",
    contactNo: "",
    expertiese: "",
    hourlyRate: "",
    password: "",
    confirmPassword: "",

  });


  

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
                  <div className="w-full max-w-[750px]"> 
                    <DotLottieReact
                      key={animationKey}
                      src="/animation/Building_and_Construction.lottie"
                      loop
                      autoplay
                      className="sm:w-[600px]"
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
                      <div className="grid gap-3  sm:flex sm:justify-between my-6 w-full">
                        <div className="sm:relative flex justify-between sm:grid sm:gap-2 w-full">
                          <label htmlFor="firstName" className="left-5 sm:left-2  relative"  >First Name</label>
                          <input
                            type="text"
                            name="firstName"
                            className="bg-white sm:w-[250px]  rounded-2xl px-2"
                          />
                        </div>
                        <div className="sm:relative flex justify-between sm:grid sm:gap-2 w-full">
                          <label htmlFor="lastName" className="left-5  sm:left-2 relative" >Last name</label>
                          <input
                            type="text"
                            name="lastName"
                            className="bg-white lg:w-[250px]   rounded-2xl px-2"
                          />
                        </div>
                      </div>
                      <div className="flex justify-between my-6  w-full">
                        <label htmlFor="email">Email</label>
                        <input
                          type="text"
                          id="email"
                          className="bg-white lg:w-[250px]   rounded-2xl px-2"
                        />
                      </div>
                      
                    <div className="flex  justify-between my-6 w-full ">
                      <label htmlFor="password">Password</label>
                      <input
                        type="text"
                        id="password"
                        className="bg-white lg:w-[250px] rounded-2xl px-2"
                      />
                    </div>
                    <div className="flex justify-between my-6  w-full">
                      <label htmlFor="confirmPss">Confirm Password</label>
                      <input
                        type="text"
                        id="confirmpass"
                        className="bg-white lg:w-[250px]  rounded-2xl px-2"
                      />
                    </div>
                    </form>
                  <div className="flex justify-center mb-2">
                    <button type="submit" className="bg-white rounded-2xl p-2 w-[10em] h-[3em]">
                      Register
                    </button>
                  </div>
                </div>
            </div>
          </div>
      </div>
      </div>
  );
}
