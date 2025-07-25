"use client";

import Image from "next/image";
import Link from "next/link";
import {  AlignJustify, X } from 'lucide-react'
import { useEffect } from "react";

export default function NavBar(){

    function sideMenue(){
        const menue = document.getElementById("mobile-first");
        if(menue) menue.classList.toggle('hidden');
    }

        return (
            <>
                <div id="mynavbar" className="navbar flex items-center justify-between text-white p-2 relative bg-[hsla(0,0%,97%,1)] drop-shadow-2xl sm:px-6 lg:px-8">
                <div>
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={150}
                        height={10} 
                        className="mx-0 max-h-[7rem]"
                    />
                </div>
                
                <ul className="hidden md:flex gap-4 text-black">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/services">Services</Link></li>
                    <li><Link href="/about">Service provice</Link></li>
                    <li><Link href="/about">Contatct Us</Link></li>
                </ul>
                <div id="controls" className="space-x-4 hidden md:flex text-black ">
                    <button className="mx-2 rounded-2xl underline w-fit p-2">register</button>
                    <button className="mx-2 rounded-2xl bg-[hsla(0,0%,77%,1)] w-[6em] p-2 
                    hover:bg-[hsla(0,0%,67%,1)]"><a href="">login</a></button>
                    <button className="mx-2 rounded-2xl bg-[hsla(0,0%,81%,1)] w-[15em] p-2
                    hover:bg-[hsla(0,0%,71%,1)]"> join as a provider</button>
                </div>
                <button onClick={sideMenue} className="md:hidden">
                    <AlignJustify size={34} stroke="black"/>
                </button>
            </div>
            
            <div id="mobile-first"className="hidden grid absolute z-50 -top-0 right-0">
                <div className="bg-[hsla(0,0%,97%,1)] drop-shadow-2xl rounded-l-2xl grid w-50 h-dvh shadow-2xl">
                    <div className="justify-self-end max-h-5 mt-5">
                        <button onClick={sideMenue}>
                        <X size={24} stroke="black"/>
                        </button>
                    </div>
                    <div className="absolute mt-20 ml-5">
                        <ul className="mt-0">
                        <li className="pb-5"><a href="">Home</a></li>
                        <li className="py-5"><a href="">Services</a></li>
                        <li className="py-5"><a href="">Service providers</a></li>
                        <li className="py-5"><a href="">Contact us</a></li>
                    </ul>
                    </div>
                    
                    <div className="content-end-safe">
                    <div id="mobile-controls" className="space-x-4 grid justify-items-center h-1/2
                    content-center text-black ">
                    <button className="m-2 rounded-2xl underline w-fit p-2">Register</button>
                    <button className="m-2 rounded-2xl bg-[hsla(0,0%,77%,1)] w-fit py-2 px-5 
                    hover:bg-[hsla(0,0%,67%,1)]"><a href="">Log in</a></button>
                    <button className="m-2 rounded-2xl bg-[hsla(0,0%,81%,1)] w-fit py-2 px-5
                    hover:bg-[hsla(0,0%,71%,1)]">Join as a provider</button>
                    </div>
                    </div>
                    </div>
            </div>

            </>
            
        );  
}