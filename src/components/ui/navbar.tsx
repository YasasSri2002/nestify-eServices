"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DynamicIcon from "../utill/DynamicIcons";

import { AlignJustify, X } from 'lucide-react'
import { LogoutUser } from "@/app/api-calls/auth/logout/route";

import Swal from "sweetalert2";


export default function NavBar() {

  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [roles, setRoles] = useState(['notLogin']);
  const [toggleSideMenu, setToggleSideMenu] = useState(false);

  const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL;

  const registrationUrl = "/register";


  useEffect(() => {

    const getUserData = async () => {

      const response = await fetch('/api-calls/users/data');

      if (!response.ok) {
        console.log("not log in")
        return null
      }

      const data = await response.json()


      setUserEmail(data.userEmail);

      if (data.roles) {
        const rolesList = JSON.parse(data.roles)
        setRoles(rolesList);
      }

      setUserId(data.userId);
    }
    getUserData()
  }, []);

  const handleLogOut = () => {

    Swal.fire({
      title: "Please wait till login out...",
      color: "#1E293B",
      background: "#fff",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    try {

      const response = LogoutUser(userId);
      console.log(response);
      setRoles(['notLogin'])

      Swal.close()

      Swal.fire({
        icon: 'success',
        title: "Successfully Logged out",
        color: "#1E293B",
        background: "#fff",
        confirmButtonColor: '#1D4ED8',
        confirmButtonText: 'Go to Login',
        timer: 2500,
        timerProgressBar: true,
        customClass: {
          popup: 'border border-[#EAF2F1]'
        }

      })

    } catch (err: unknown) {
      console.log(err)

      Swal.fire({
        icon: 'error',
        title: 'Logging out Failed',
        text: err instanceof Error ? err.message : 'An unexpected error occurred.',
        background: '#fff',
        color: '#1E293B',
        confirmButtonColor: '#1D4ED8',
        customClass: {
          popup: 'border border-[#EAF2F1]'
        }
      });
    }


  }

  const dashboardRenderingDesktop = () => {

    if (roles.some(role => role === "user")) {
      return (
        <div className="hidden xl:flex">
          <button
            className="mb-2 md:m-2 lg:m-2 rounded-lg border border-[#1D4ED8] text-[#1D4ED8] w-30 py-2 px-5 
                    hover:bg-[#DBEAFE]  active:scale-95 transition-all duration-200"
          >
            <Link href={`/users/profile/${userId}`}>Dashboard</Link>
          </button>
          <button
            className="lg:m-2 md:m-2 rounded-lg bg-[#1D4ED8] w-30 py-2 px-5
                    hover:bg-[#2563EB] active:scale-95 text-white flex justify-center items-center gap-2 transition-all duration-200"
            onClick={handleLogOut}
          >
            <DynamicIcon name='CiLogout'></DynamicIcon>
            Log out
          </button>
        </div>
      )
    }

    if (roles.some(role => role === "provider")) {
      return (
        <div className="hidden xl:flex">
          <button
            className="mb-2 md:m-2 lg:m-2 rounded-lg border border-[#1D4ED8] w-30 py-2 px-5 
                    hover:bg-[#DBEAFE]  active:scale-95 text-[#1D4ED8] flex justify-center items-center gap-2 transition-all duration-200"
          >
            <Link href={`/providers/profile/${userId}`}>Dashboard</Link>
          </button>
          <button
            className="lg:m-2 md:m-2 rounded-lg bg-[#1D4ED8] w-30 py-2 px-5
                    hover:bg-[#2563EB] active:scale-95 text-white transition-all duration-200"
            onClick={handleLogOut}
          >
            <DynamicIcon name='CiLogout'></DynamicIcon>
            Log out
          </button>
        </div>
      )
    }

    if (roles.some(role => role === "admin")) {
      return (
        <div className="hidden xl:flex">
          <button
            className="mb-2 md:m-2 lg:m-2 rounded-lg border border-[#1D4ED8] w-30 py-2 px-5 
                    hover:bg-[#DBEAFE]  active:scale-95 text-[#1D4ED8] transition-all duration-200"
          >
            <Link href={`/site-admin/${userId}`}>Dashboard</Link>
          </button>
          <button
            className="lg:m-2 md:m-2 rounded-lg bg-[#1D4ED8] w-30 py-2 px-5
                    hover:bg-[#2563EB] active:scale-95 text-white flex justify-center items-center gap-2 transition-all duration-200"
            onClick={handleLogOut}
          >
            <DynamicIcon name='CiLogout'></DynamicIcon>
            Log out
          </button>
        </div>
      )
    }

    if (roles.some(role => role == 'notLogin')) {
      return (
        <div className="xl:flex hidden">
          <button
            className="mb-2 md:m-2 lg:m-2 rounded-lg border border-[#1D4ED8] text-[#1D4ED8] w-25 py-2 px-5 
                  hover:bg-[#DBEAFE] active:scale-95 transition-all duration-200"
          >
            <Link href={loginUrl!}>Log in</Link>
          </button>
          <button
            className="lg:m-2 md:m-2 rounded-lg text-white bg-[#1D4ED8] w-25 py-2 px-5
                  hover:bg-[#2563EB] active:scale-95 transition-all duration-200"
          >
            <Link href={registrationUrl!}>Register</Link>
          </button>
        </div>
      )
    }
  }

  const dashboardRenderingMobile = () => {

    if (roles.some(role => role === "user")) {
      return (
        <div className=" grid  justify-items-center h-full
                     md:h-1/2  content-end text-black ">
          <button
            className="mb-2 md:m-2 lg:m-2 rounded-lg border border-[#1D4ED8] text-[#1D4ED8]  py-2 px-5 
                    hover:bg-[#DBEAFE] w-30 transition-all duration-200"
          >
            <Link href={`/users/profile/${userId}`}>Dashboard</Link>
          </button>
          <button
            className="lg:m-2 md:m-2 rounded-lg bg-[#1D4ED8] py-2 px-5
                    hover:bg-[#2563EB] w-30 flex justify-center items-center gap-2 text-white transition-all duration-200"
            onClick={handleLogOut}
          >
            <DynamicIcon name='CiLogout'></DynamicIcon>
            Log out
          </button>
        </div>
      )
    }

    if (roles.some(role => role === "provider")) {
      return (
        <div className=" grid  justify-items-center h-full
                     md:h-1/2  content-end text-black ">
          <button
            className="mb-2 md:m-2 lg:m-2 rounded-lg border border-[#1D4ED8] text-[#1D4ED8]  py-2 px-5 
                    hover:bg-[#DBEAFE] w-30 transition-all duration-200"
          >
            <Link href={`/providers/profile/${userId}`}>Dashboard</Link>
          </button>
          <button
            className="lg:m-2 md:m-2 rounded-lg bg-[#1D4ED8] py-2 px-5
                    hover:bg-[#2563EB] w-30 flex justify-center items-center gap-2 text-white transition-all duration-200"
            onClick={handleLogOut}
          >
            <DynamicIcon name='CiLogout'></DynamicIcon>
            Log out
          </button>
        </div>
      )
    }

    if (roles.some(role => role === "admin")) {
      return (
        <div className="  justify-items-center h-full
                     md:h-1/2  content-end text-black ">
          <button
            className="mb-2 md:m-2 lg:m-2 rounded-lg border border-[#1D4ED8] text-[#1D4ED8]  py-2 px-5 
                    hover:bg-[#DBEAFE] w-30 transition-all duration-200"
          >
            <Link href={`/site-admin/${userId}`}>Dashboard</Link>
          </button>
          <button
            className="lg:m-2 md:m-2 rounded-lg bg-[#1D4ED8] py-2 px-5
                    hover:bg-[#2563EB] w-30 flex justify-center items-center gap-2 text-white transition-all duration-200"
            onClick={handleLogOut}
          >
            <DynamicIcon name='CiLogout'></DynamicIcon>
            Log out
          </button>
        </div>
      )
    }

    if (roles.some(role => role == 'notLogin')) {
      return (
        <div className="grid  justify-items-center h-full
                     md:h-1/2  content-end text-black">
          <button
            className="mb-2 md:m-2 lg:m-2 rounded-lg border border-[#1D4ED8] text-[#1D4ED8] py-2 px-5 
                  hover:bg-[#DBEAFE] w-25 active:scale-95 transition-all duration-200"
          >
            <Link href={loginUrl!}>Log in</Link>
          </button>
          <button
            className="lg:m-2 md:m-2 rounded-lg bg-[#1D4ED8] py-2 px-5
                    hover:bg-[#2563EB] w-25 active:scale-95 text-white transition-all duration-200"
          >
            <Link href={registrationUrl!}>Register</Link>
          </button>
        </div>
      )
    }
  }




  return (
    <>
      <div
        id="mynavbar"
        className="flex items-center justify-between text-white p-2 relative 
              bg-white border-b border-[#EAF2F1] 
              shadow-[0_1px_3px_rgba(10,25,47,0.06)] sm:px-6 lg:px-8 w-full h-20 "
      >
        <div id="logo" onClick={() => window.location.href = "/"}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={150}
            height={10}
            className="mx-0 w-auto h-auto max-h-28"
          />
        </div>

        <ul className="hidden xl:flex gap-4 text-[#475569]">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/service-gigs">Services</Link>
          </li>
          <li>
            <Link href="/providers">Service providers</Link>
          </li>
          <li>
            <Link href="/about">About Us</Link>
          </li>
        </ul>
        {
          dashboardRenderingDesktop()
        }
        <button onClick={() => setToggleSideMenu(!toggleSideMenu)} className="xl:hidden">
          <AlignJustify size={34} stroke="#1E293B" />
        </button>
      </div>

      <div
        id="mobile-first"
        className={`${toggleSideMenu ? 'justify-end absolute z-50 top-0 right-0 xl:hidden' : 'hidden'}`}
      >
        <div className="bg-white drop-shadow-2xl rounded-l-2xl grid w-50 h-dvh shadow-[0_12px_32px_rgba(10,25,47,0.12)]">
          <div className="justify-self-end max-h-5 mt-5 relative right-5">
            <button onClick={() => setToggleSideMenu(!toggleSideMenu)}>
              <X size={24} stroke="#1E293B" />
            </button>
          </div>
          <div className="absolute mt-20 ml-5">
            <ul className="mt-0">
              <li className="pb-2">
                <Link href="/">Home</Link>
              </li>
              <li className="py-2">
                <Link href="/service-gigs">Services</Link>
              </li>
              <li className="py-2">
                <Link href="/providers">Service providers</Link>
              </li>
              <li className="py-2">
                <Link href="/about">About us</Link>
              </li>
            </ul>
          </div>

          <div className="content-end mb-2 mt-25 lg:mt-0 relative bottom-5">
            {
              dashboardRenderingMobile()
            }
          </div>
        </div>
      </div>
    </>
  );
}