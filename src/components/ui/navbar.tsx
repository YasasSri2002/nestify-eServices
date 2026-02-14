"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DynamicIcon from "../utill/DynamicIcons";

import {  AlignJustify, X } from 'lucide-react'
import { LogoutUser } from "@/app/api-calls/auth/logout/route";


export default function NavBar(){

  const [userEmail, setUserEmail] = useState('');
  const [userId,setUserId] = useState('');
  const [roles , setRoles] = useState(['notLogin']);
  const [toggleSideMenu, setToggleSideMenu] = useState(false);

  const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL;

  const registrationUrl =  "/register";

  
  useEffect(() => {
    
  const getUserData =async ()=>{
   
    const response =  await fetch('/api-calls/users/data');

    if(!response.ok){
      console.log("not log in")
    }

    const data  =  await response.json()

    console.log("from nav bar the user data function---> " , data);

    setUserEmail(data.userEmail);

    if(data.roles){
      const rolesList = JSON.parse(data.roles)
      setRoles(rolesList);
    }

    setUserId(data.userId);
    console.log(Array.isArray(data.rolesList));
  }
    getUserData() 
  }, []);

  const handleLogOut = ()=>{

      const response = LogoutUser(userId);
      console.log(response);

      setRoles(['notLogin'])
    

    }

    const dashboardRenderingDesktop = ()=>{

      if(roles.some(role => role === "user")){
        return(
            <div className="hidden xl:flex">
                <button
                  className="mb-2 md:m-2 lg:m-2 rounded-lg border border-gray-800 text-black/80 w-30 py-2 px-5 
                    hover:bg-[hsla(0,0%,67%,1)]  active:scale-75"
                >
                  <Link href={`/users/profile/${userId}`}>Dashboard</Link>
                </button>
                <button
                  className="lg:m-2 md:m-2 rounded-lg bg-[hsla(0,0%,81%,1)] w-30 py-2 px-5
                    hover:bg-[hsla(0,0%,71%,1)] active:scale-75 text-black/80 flex justify-center items-center gap-2 "
                    onClick={handleLogOut}
                >
                  <DynamicIcon name='CiLogout'></DynamicIcon>
                  Log out
                </button>
          </div>
        )
      }

      if(roles.some(role => role === "provider")){
        return(
            <div className="hidden xl:flex">
                <button
                  className="mb-2 md:m-2 lg:m-2 rounded-lg border border-gray-800 w-30 py-2 px-5 
                    hover:bg-[hsla(0,0%,67%,1)]  active:scale-75 text-black/80 flex justify-center items-center gap-2"
                >
                  <Link href={`/providers/profile/${userId}`}>Dashboard</Link>
                </button>
                <button
                  className="lg:m-2 md:m-2 rounded-lg bg-[hsla(0,0%,81%,1)] w-30 py-2 px-5
                    hover:bg-[hsla(0,0%,71%,1)] active:scale-75 text-black/80"
                    onClick={handleLogOut}
                >
                  <DynamicIcon name='CiLogout'></DynamicIcon>
                  Log out
                </button>
          </div>
        )
      }

      if(roles.some(role => role === "admin")){
        return(
            <div className="hidden xl:flex">
                <button
                  className="mb-2 md:m-2 lg:m-2 rounded-lg border border-gray-800 w-30 py-2 px-5 
                    hover:bg-[hsla(0,0%,67%,1)]  active:scale-75 text-black/80"
                >
                  <Link href={`/site-admin/${userId}`}>Dashboard</Link>
                </button>
                <button
                  className="lg:m-2 md:m-2 rounded-lg bg-[hsla(0,0%,81%,1)] w-30 py-2 px-5
                    hover:bg-[hsla(0,0%,71%,1)] active:scale-75 text-black/80 flex justify-center items-center gap-2"
                    onClick={handleLogOut}
                >
                  <DynamicIcon name='CiLogout'></DynamicIcon>
                  Log out
                </button>
          </div>
        )
      }

      if(roles.some(role => role == 'notLogin')){
        return(
          <div className="xl:flex hidden">
              <button
                className="mb-2 md:m-2 lg:m-2 rounded-lg border border-gray-800 text-black/80 w-25 py-2 px-5 
                  hover:bg-[#ecececfa] active:scale-75"
              >
                <Link href={loginUrl!}>Log in</Link>
              </button>
              <button
                className="lg:m-2 md:m-2 rounded-lg text-black/80 bg-[hsla(0,0%,81%,1)] w-25 py-2 px-5
                  hover:bg-[hsla(0,0%,71%,1)] active:scale-75"
              >
                <Link href={registrationUrl!}>Register</Link>
              </button>
        </div>
        )
      }
    }

    const dashboardRenderingMobile = ()=>{

      if(roles.some(role => role === "user")){
        return(
            <div className=" grid  justify-items-center h-full
                     md:h-1/2  content-end text-black ">
                <button
                  className="mb-2 md:m-2 lg:m-2 rounded-lg border border-gray-800 text-black/80  py-2 px-5 
                    hover:bg-[hsla(0,0%,67%,1)] w-30 "
                >
                  <Link href={`/users/profile/${userId}`}>Dashboard</Link>
                </button>
                <button
                  className="lg:m-2 md:m-2 rounded-lg bg-[hsla(0,0%,81%,1)] py-2 px-5
                    hover:bg-[hsla(0,0%,71%,1)] w-30 flex justify-center items-center gap-2"
                    onClick={handleLogOut}
                >
                  <DynamicIcon name='CiLogout'></DynamicIcon>
                  Log out
                </button>
          </div>
        )
      }

      if(roles.some(role => role === "provider")){
        return(
            <div className=" grid  justify-items-center h-full
                     md:h-1/2  content-end text-black ">
                <button
                  className="mb-2 md:m-2 lg:m-2 rounded-lg border border-gray-800 text-black/80  py-2 px-5 
                    hover:bg-[hsla(0,0%,67%,1)] w-30 "
                >
                  <Link href={`/providers/profile/${userId}`}>Dashboard</Link>
                </button>
                <button
                  className="lg:m-2 md:m-2 rounded-lg bg-[hsla(0,0%,81%,1)] py-2 px-5
                    hover:bg-[hsla(0,0%,71%,1)] w-30 flex justify-center items-center gap-2"
                    onClick={handleLogOut}
                >
                  <DynamicIcon name='CiLogout'></DynamicIcon>
                  Log out
                </button>
          </div>
        )
      }

      if(roles.some(role => role === "admin")){
        return(
            <div className="  justify-items-center h-full
                     md:h-1/2  content-end text-black ">
                <button
                  className="mb-2 md:m-2 lg:m-2 rounded-lg border border-gray-800 text-black/80  py-2 px-5 
                    hover:bg-[hsla(0,0%,67%,1)] w-30 "
                >
                  <Link href={`/site-admin/${userId}`}>Dashboard</Link>
                </button>
                <button
                  className="lg:m-2 md:m-2 rounded-lg bg-[hsla(0,0%,81%,1)] py-2 px-5
                    hover:bg-[hsla(0,0%,71%,1)] w-30 flex justify-center items-center gap-2"
                    onClick={handleLogOut}
                >
                  <DynamicIcon name='CiLogout'></DynamicIcon>
                  Log out
                </button>
          </div>
        )
      }

      if(roles.some(role => role == 'notLogin')){
        return(
          <div className="grid  justify-items-center h-full
                     md:h-1/2  content-end text-black">
              <button
                className="mb-2 md:m-2 lg:m-2 rounded-lg border border-gray-800  py-2 px-5 
                  hover:bg-[hsla(0,0%,67%,1)] w-25 active:scale-75"
              >
                <Link href={loginUrl!}>Log in</Link>
              </button>
              <button
                className="lg:m-2 md:m-2 rounded-lg bg-[hsla(0,0%,81%,1)] py-2 px-5
                    hover:bg-[hsla(0,0%,71%,1)] w-25 active:scale-75"
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
              className="flex items-center justify-between text-white p-2 relative bg-[hsla(0,0%,97%,1)] drop-shadow-xl sm:px-6 lg:px-8 w-full "
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

              <ul className="hidden xl:flex gap-4 text-black">
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
              <button onClick={()=>setToggleSideMenu(!toggleSideMenu)} className="xl:hidden">
                <AlignJustify size={34} stroke="black" />
              </button>
            </div>

            <div
              id="mobile-first"
              className={`${toggleSideMenu ? 'justify-end absolute z-50 top-0 right-0' : 'hidden'  }`}
            >
              <div className="bg-[hsla(0,0%,97%,1)] drop-shadow-2xl rounded-l-2xl grid w-50 h-dvh shadow-2xl">
                <div className="justify-self-end max-h-5 mt-5 relative right-5">
                  <button onClick={()=> setToggleSideMenu(!toggleSideMenu)}>
                    <X size={24} stroke="black" />
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