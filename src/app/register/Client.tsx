"use client";
import { useState,useEffect, FormEvent } from "react";
import { useRouter } from 'next/navigation';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { LiaWindowCloseSolid } from "react-icons/lia";
import { registerUser } from "../api-calls/users/register/route";
import { UserData } from "@/dto/UserDto";

import Swal from "sweetalert2";


export default function ClientForm() {

  const router = useRouter();
  const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL;

   // Use state to force remount when switching
  const [animationKey, setAnimationKey] = useState(Date.now());

  // Reset animation when component mounts
  useEffect(() => {
    return () => {
      // Trigger re-render with new key when component unmounts
      setAnimationKey(Date.now());
    };
  }, []);

  async function handleFormData(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    const data = new FormData(event.currentTarget) 
    console.log("client register form data --->",data)
     const userData: UserData = {
      firstName: data.get("firstName") as string,
      lastName: data.get("lastName") as string,
      username: data.get("username") as string,
      email: data.get("email") as string,
      password: data.get("password") as string,
    };

     Swal.fire({
      title: 'Registering...',
      text: 'Please wait while we process your registration',
      allowOutsideClick: false,
      background: '#fff',
      color: '#000000',
      didOpen: () => {
        Swal.showLoading();
    }
  });

   try{
     const response = await registerUser(userData)

     Swal.close();
    
    // Show success (adjust this based on your API response)
    await Swal.fire({
      icon: 'success',
      title: 'Registration Successful!',
      text: 'Welcome to our blood donor community. Redirecting to login...',
      background: '#fff',
      color: '#000000',
      confirmButtonColor: '#dc2626',
      confirmButtonText: 'Go to Login',
      timer: 2500,
      timerProgressBar: true,
      customClass: {
        popup: 'border border-gray-700'
      }
    });
    
    router.push(loginUrl!);
     
   }catch(err: unknown){
    console.log(err)
    Swal.fire({
      icon: 'error',
      title: 'Registration Failed',
      text: err instanceof Error ? err.message : 'An unexpected error occurred.',
      background: '#fff',
      color: '#000000',
      confirmButtonColor: '#dc2626',
      customClass: {
        popup: 'border border-gray-700'
      }
    });
   }


  }

  return (
      <div className="w-full max-w-[100vw]">
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1fr] items-center w-full">
          <div className="w-full flex justify-center bg-white p-4">
            <div className="max-w-full flex flex-col items-center">
              <h2 className="text-xl font-bold">Register as a client</h2>
              <div className="w-full max-w-187.5">
                <DotLottieReact
                  key={animationKey} // Key forces remount
                  src="/animation/real_estate.lottie"
                  loop
                  autoplay
                  className="sm:w-150"
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
            <form  onSubmit={handleFormData}>
               <div className="grid gap-5">
                  <div className="grid sm:flex gap-2  sm:gap-5 w-full">
                  <div className="grid  w-full gap-2 ">
                    <label htmlFor="firstName" className="pl-1">First name</label>
                    <input type="text" name="firstName" className="w-full rounded-md h-8 px-2 bg-white" />
                  </div>
                  <div className="grid  w-full gap-2">
                    <label htmlFor="lastName" className="pl-1">Last name</label>
                    <input type="text" name="lastName" className="w-full  rounded-md h-8 px-2 bg-white" />
                  </div>
                </div>
                
                  <div className="grid w-full  gap-2">
                  <label htmlFor="username" className="pl-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="bg-white w-full h-8  rounded-md px-2"
                  />
                </div>
                  <div className="grid   w-full gap-2 ">
                  <label htmlFor="email" className="pl-1">Email</label>
                  <input
                    type="text"
                    name="email"
                    className="bg-white w-full h-8  rounded-md px-2"
                  />
                </div>
              
                
              <div className="grid sm:flex gap-5 w-full">
                <div className="grid  w-full ">
                  <label htmlFor="password" className="pl-1">Password</label>
                  <input
                    type="text"
                    name="password"
                    className="bg-white w-full h-8  rounded-md px-2"
                  />
                </div>
                <div className="grid   w-full">
                  <label htmlFor="confirmPass" className="pl-1">Confirm Password</label>
                  <input
                    type="text"
                    name="confirmPass"
                    className="bg-white w-full h-8  rounded-md px-2"
                  />
                </div>
              </div>
                <div className="flex justify-center mb-2 my-8">
                  <button className="bg-white rounded-2xl p-2 w-[10em]" type="submit">
                    Register
                  </button>
                </div>
               </div>
            </form>
          </div>
        </div>
      </div>


  );
}
