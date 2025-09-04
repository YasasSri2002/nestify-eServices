"use client";

import Image from "next/image";
import Link from "next/link";
import {  AlignJustify, X } from 'lucide-react'
import { useEffect,useState } from "react";
import axios  from "axios";

export default function NavBar(){

    const email = "superadmin@gmail.com";
    const password = "superadmin123$";
    
    useEffect(()=>{

        const requestlogin = async()=>{
          const login = await axios.post("http://localhost:8080/admin/login", {
          username: "superadmin@gmail.com",
          password: "superadmin123$",
        });

        const token = login.data.jwtToken;

        if(token){
          localStorage.setItem("token",token);
        }}
         requestlogin();
    },[])
    
    


    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function sideMenue(){
        const menue = document.getElementById("mobile-first");
        if(menue) menue.classList.toggle('hidden');
    }

    useEffect(()=>{
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
            
    },[])

        return (
          <>
            <div
              id="mynavbar"
              className="navbar flex items-center justify-between text-white p-2 relative bg-[hsla(0,0%,97%,1)] drop-shadow-xl sm:px-6 lg:px-8 w-full"
            >
              <div>
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={150}
                  height={10}
                  className="mx-0 max-h-[7rem]"
                />
              </div>

              <ul className="hidden xl:flex gap-4 text-black">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/services">Services</Link>
                </li>
                <li>
                  <Link href="/providers">Service provice</Link>
                </li>
                <li>
                  <Link href="/about">Contatct Us</Link>
                </li>
              </ul>
              <div
                id="controls"
                className="space-x-4 hidden xl:flex text-black "
              >
                {!isLoggedIn ? (
                  <>
                    <button
                      className="mx-2 rounded-2xl bg-[hsla(0,0%,77%,1)] w-[10em] p-2 
                    hover:bg-[hsla(0,0%,67%,1)]"
                    >
                      <Link href="/login">login</Link>
                    </button>
                    <button
                      className="mx-2 rounded-2xl bg-[hsla(0,0%,81%,1)] w-[10em] p-2
                    hover:bg-[hsla(0,0%,71%,1)]"
                    >
                      <Link href="/register">Register</Link>{" "}
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/profile">
                      <button className="mx-2 rounded-2xl bg-[hsla(0,0%,81%,1)] w-[10em] p-2 
                        hover:bg-[hsla(0,0%,71%,1)]">
                        Profile
                      </button>
                    </Link>
                    <button className="mx-2 rounded-2xl bg-red-400 w-[10em] p-2 hover:bg-red-500"
                      onClick={() => {
                        localStorage.removeItem("token");
                        setIsLoggedIn(false);
                      }}
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
              <button onClick={sideMenue} className="xl:hidden">
                <AlignJustify size={34} stroke="black" />
              </button>
            </div>

            <div
              id="mobile-first"
              className="hidden grid justify-end absolute z-50 -top-0 right-0"
            >
              <div className="bg-[hsla(0,0%,97%,1)] drop-shadow-2xl rounded-l-2xl grid w-50 h-dvh shadow-2xl">
                <div className="justify-self-end max-h-5 mt-5 relative right-5">
                  <button onClick={sideMenue}>
                    <X size={24} stroke="black" />
                  </button>
                </div>
                <div className="absolute mt-20 ml-5">
                  <ul className="mt-0">
                    <li className="pb-2">
                      <a href="">Home</a>
                    </li>
                    <li className="py-2">
                      <a href="">Services</a>
                    </li>
                    <li className="py-2">
                      <a href="">Service providers</a>
                    </li>
                    <li className="py-2">
                      <a href="">Contact us</a>
                    </li>
                  </ul>
                </div>

                <div className="content-end mb-2 mt-25 lg:mt-0 relative bottom-5">
                  <div
                    id="mobile-controls"
                    className="space-x-4 grid  justify-items-center h-full
                     md:h-1/2  content-end text-black "
                  >
                     {!isLoggedIn ? (
                  <>
                   <button
                      className="mb-2 md:m-2 lg:m-2 rounded-2xl bg-[hsla(0,0%,77%,1)] w-fit py-2 px-5 
                    hover:bg-[hsla(0,0%,67%,1)]"
                    >
                      <Link href="/login">Log in</Link>
                    </button>
                    <button
                      className="lg:m-2 md:m-2 rounded-2xl bg-[hsla(0,0%,81%,1)] w-fit py-2 px-5
                    hover:bg-[hsla(0,0%,71%,1)]"
                    >
                      <Link href="/register">Register</Link>
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/profile">
                      <button className="mb-2 ml-2.5 md:m-2 lg:m-2 rounded-2xl bg-[hsla(0,0%,77%,1)] w-fit py-2 px-10
                    hover:bg-[hsla(0,0%,67%,1)]">
                        Profile
                      </button>
                    </Link>
                    <button className="mb-2 md:m-2 m-0 lg:m-2 rounded-2xl bg-[hsla(0,0%,77%,1)] w-fit py-2 px-10
                    hover:bg-[hsla(0,0%,67%,1)]"
                      onClick={() => {
                        localStorage.removeItem("token");
                        setIsLoggedIn(false);
                      }}
                    >
                      Logout
                    </button>
                  </>
                )}
                  </div>
                </div>
              </div>
            </div>
          </>
        );  
}