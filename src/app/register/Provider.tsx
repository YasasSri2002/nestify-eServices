"use client";
import { useState, useEffect, FormEvent } from "react";


import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { LiaWindowCloseSolid } from "react-icons/lia";
import { ProviderRegisterFormErrors, providerRegisterSchema } from "../../lib/schema/providerRegisterSchema";
import { PersistProvider } from "../api-calls/provider/persist/route";
import { ProviderRegistrationDto } from "@/dto/ProviderDto";
import { title } from "process";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";






export default function ProviderForm() {

  const router = useRouter();

  const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL;

  // Use state to force remount when switching
  const [animationKey, setAnimationKey] = useState(Date.now());
  const [errors, setErrors] = useState<ProviderRegisterFormErrors>({});



  // Reset animation when component mounts
  useEffect(() => {
    return () => {
      // Trigger re-render with new key when component unmounts
      setAnimationKey(Date.now());
    };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);

    const formValues = {
      firstName: data.get("firstName") as string,
      lastName: data.get("lastName") as string,
      username: data.get("username") as string,
      email: data.get("email") as string,
      password: data.get("password") as string,
      contactNo: data.get("contactNo") as string
    };

    Swal.fire({
      title: "Registering.....",
      text: "Please wait till we register your Data",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    })

    const result = providerRegisterSchema.safeParse(formValues);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return; // Stop here, don't call the API
    }


    setErrors({})

    const providerData: ProviderRegistrationDto = {
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      userName: result.data.username,
      email: result.data.email,
      password: result.data.password,
      contactNo: result.data.contactNo
    };

    try {

      await PersistProvider(providerData);
      Swal.close()

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Welcome to our Nestify community. Redirecting to login...',
        background: '#fff',
        color: '#000000',
        confirmButtonColor: '#dc2626',
        confirmButtonText: 'Go to Login',
        timer: 2500,
        timerProgressBar: true,
        customClass: {
          popup: 'border border-gray-700'
        }
      })

      router.push(loginUrl!);

    } catch (err: unknown) {

      console.log("err", err)

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
        <div className="lg:col-2 w-full">
          <div className="w-full rounded-3xl content-center">
            <div className="w-full px-6 py-4">
              <form onSubmit={submit} className="w-full">
                <div className="w-full grid gap-2 sm:gap-3">
                  <div className="flex gap-4 w-full">
                    <div className="grid gap-2 w-full">
                      <label htmlFor="firstName" className="pl-1">First name</label>
                      <input type="text" name="firstName"
                        className="h-8 w-full rounded-sm p-2 border focus:border-[#1D4ED8]"
                        placeholder="First name" />
                      {errors.firstName && <p className="text-red-500 text-sm pl-1">{errors.firstName[0]}</p>}
                    </div>
                    <div className="grid gap-2 w-full">
                      <label htmlFor="lastName" className="pl-1">Last name</label>
                      <input type="text" name="lastName" className="h-8 w-full rounded-sm p-2 border focus:border-[#1D4ED8]"
                        placeholder="Last name" />
                      {errors.lastName && <p className="text-red-500 text-sm pl-1">{errors.lastName[0]}</p>}
                    </div>
                  </div>
                  <div className="grid w-full gap-2">
                    <label htmlFor="email" className="pl-1">Email</label>
                    <input type="text" name="email" className=" w-full h-8 rounded-sm pl-3 border focus:border-[#1D4ED8]"
                      placeholder="Email" />
                    {errors.email && <p className="text-red-500 text-sm pl-1">{errors.email[0]}</p>}
                  </div>
                  <div className="grid w-full gap-2">
                    <label htmlFor="username" className="pl-1">Username</label>
                    <input type="text" name="username" className="w-full h-8 rounded-sm pl-3 border focus:border-[#1D4ED8]"
                      placeholder="Username" />
                    {errors.username && <p className="text-red-500 text-sm pl-1">{errors.username[0]}</p>}
                  </div>
                  <div className="grid w-full gap-2">
                    <label htmlFor="contactNo">Phone Number</label>
                    <div className="flex gap-2">
                      <select className="h-8">
                        <option value="0">SL (+94)</option>
                        <option value="0">US (+1)</option>
                      </select>
                      <input type="text" name="contactNo" className="h-8 rounded-sm pl-2 w-full border focus:border-[#1D4ED8]"
                        placeholder="Contact" />
                    </div>
                    {errors.contactNo && <p className="text-red-500 text-sm pl-1">{errors.contactNo[0]}</p>}
                  </div>
                  <div className="grid w-full gap-2">
                    <label htmlFor="password" className="pl-1">Password</label>
                    <input type="text" name="password" className=" w-full h-8 rounded-sm pl-3 border focus:border-[#1D4ED8]"
                      placeholder="Password" />
                    {errors.password && <p className="text-red-500 text-sm pl-1">{errors.password[0]}</p>}
                  </div>
                  <button type="submit"
                    className="bg-[#1D4ED8] hover:bg-[#2563EB] active:bg-[#2563EB]
                  active:scale-95 text-white rounded-full p-2 w-full mt-5">
                    Create an Account
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
