"use client";
import { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { LiaWindowCloseSolid } from "react-icons/lia";
import axios from "axios";

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

  const registerApi = async(registerProvider:any)=>{
    await axios.post('http://localhost:8090/admin/realms/market-realm/users',{
      email:"",
      username:"",
      contactNo: "",
      expertiese: "",
      hourlyRate: "",
      password: "",
      confirmPassword: ""
    })
  }

  // Reset animation when component mounts
  useEffect(() => {
    return () => {
      // Trigger re-render with new key when component unmounts
      setAnimationKey(Date.now());
    };
  }, []);

  return (
    <>
      <div className="w-full max-w-[100vw]">
        <div className="flex flex-col sm:grid sm:grid-cols-[1fr_1fr] items-center w-full">
          <div className="w-full flex justify-center bg-white p-4">
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
          <div className="w-full bg-gray-200 rounded-3xl p-4 justify-items-center content-center">
            <div className="w-full flex justify-end relative top-2 right-5">
              <LiaWindowCloseSolid size={34} />
            </div>
            <div className="flex justify-evenly my-6 w-full ">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                className="bg-white sm:w-[250px] relative left-8  rounded-2xl px-2"
              />
            </div>
            <div className="flex justify-evenly my-6  w-full">
              <label htmlFor="contact">Contact No</label>
              <input
                type="text"
                id="contact"
                className="bg-white sm:w-[250px] relative  left-5 rounded-2xl px-2"
              />
            </div>
            <div className="flex  justify-evenly my-6 w-full ">
              <label htmlFor="experties">Experties</label>
              <input
                type="text"
                id="experties"
                className="bg-white sm:w-[250px] relative left-6 rounded-2xl px-2"
              />
            </div>
            <div className="flex  justify-evenly my-6 w-full ">
              <label htmlFor="hourlyRate">Hourly Rate</label>
              <input
                type="text"
                id="hourlyRate"
                className="bg-white sm:w-[250px] relative left-5 rounded-2xl px-2"
              />
            </div>
            <div className="flex  justify-evenly my-6 w-full ">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                id="password"
                className="bg-white sm:w-[250px] relative left-6 rounded-2xl px-2"
              />
            </div>
            <div className="flex justify-evenly my-6  w-full">
              <label htmlFor="confirmPss">Confirm Password</label>
              <input
                type="text"
                id="confirmpass"
                className="bg-white sm:w-[250px] relative left-1  rounded-2xl px-2"
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
    </>
  );
}
