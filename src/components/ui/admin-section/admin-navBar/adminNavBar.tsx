"use client";
import Link from "next/link";
import { useEffect,useState } from "react";

import DynamicIcon from "@/components/utill/DynamicIcons";

function sideMenue(){
        const menue = document.getElementById("mobile-first");
        if(menue) menue.classList.toggle('hidden');
    }

export default function NavBar(){

  const [userEmail,setUserEmail] =useState("");
  const [userName,setUserName] =useState("");

   useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await fetch('/api-calls/users/data');
          const data = await res.json();   // parse JSON
          setUserName(data.userName);
          setUserEmail(data.userEmail);
        } catch (err) {
          console.error(err);
        }
      };

        fetchUser();
  }, []);


        return (
          <>
            <div
              id="mynavbar"
              className="navbar flex items-center justify-between text-white p-2 relative bg-[hsla(0,0%,97%,1)] drop-shadow-xl sm:px-6 lg:px-8 w-full h-18"
            >
              <div className="text-black">
                <Link href={'/'} className="flex items-center"><DynamicIcon name="FaArrowLeft" className="mr-2"/>Back to site</Link>
              </div>
              <Link href="/site-admin" className="text-2xl text-black">Admin Dashboard</Link>
              <ul className="hidden xl:flex gap-4 text-black">
                <li>
                  <Link href="/site-admin/users">users</Link>
                </li>
                <li>
                  <Link href="/site-admin/providers">providers</Link>
                </li>
                <li>
                  <Link href="/site-admin/payments">payments</Link>
                </li>
                <div className="flex border-2 rounded-2xl space-x-5 p-2 ">
                    <li>{userName}</li>
                    <li>{userEmail}</li>
                </div>
              </ul>
              <button onClick={sideMenue} className="xl:hidden">
                <DynamicIcon name="FaAlignJustify" className="text-black"/>
              </button>
            </div>

            <div
              id="mobile-first"
              className="hidden  justify-end absolute z-50 -top-0 right-0"
            >
              <div className="bg-[hsla(0,0%,97%,1)] drop-shadow-2xl rounded-l-2xl grid w-50 h-dvh shadow-2xl">
                <div className="justify-self-end max-h-5 mt-5 relative right-5">
                  <button onClick={sideMenue}>
                    <DynamicIcon name="MdClose" className="text-black"/>
                  </button>
                </div>
                <div className="absolute mt-20 ml-5">
                  <ul className="mt-0 grid h-full content-between">
                    <div>
                        <li className="pb-2">
                        <Link href="/site-admin">admin Dashboard</Link>
                      </li>
                      <li className="py-2">
                        <Link href="/site-admin/users">Users</Link>
                      </li>
                      <li className="py-2">
                        <Link href="/site-admin/providers">providers</Link>
                      </li>
                      <li className="py-2">
                        <Link href="/site-admin/payments">payment</Link>
                      </li>
                    </div>
                    <div className="grid border-2 rounded-2xl space-x-5 p-2">
                      <li>{userName}</li>
                      <li>{userEmail}</li>
                    </div>
                  </ul> 
                </div>
              </div>
            </div>
          </>
        );  
}