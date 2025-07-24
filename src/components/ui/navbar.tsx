"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function NavBar(){

        return (
            <>
                <div id="mynavbar" className="navbar flex items-center justify-between text-white p-2 relative bg-[hsla(0,0%,97%,1)] drop-shadow-2xl">
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
                <div id="controls" className="space-x-4 md:flex text-black">
                    <button className="btn mx-2 rounded-2xl underline w-fit p-2">register</button>
                    <button className="btn mx-2 rounded-2xl bg-[hsla(0,0%,77%,1)] w-[6em] p-2 
                    hover:bg-[hsla(0,0%,67%,1)]"><a href="">login</a></button>
                    <button className="btn mx-2 rounded-2xl bg-[hsla(0,0%,81%,1)] w-[15em] p-2
                    hover:bg-[hsla(0,0%,71%,1)]"> join as a provider</button>
                </div>
                <button
                    className="md:hidden flex flex-col justify-between items-between"
                    onClick={() => {
                        const menu = document.getElementById("mobile-menu");
                        if (menu) menu.classList.toggle("hidden");
                        const buttons = document.getElementById("controls");
                        if (buttons) buttons.classList.toggle("hidden");
                        
                    }}
                    aria-label="Toggle menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu-icon lucide-menu"><path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/></svg>
                </button>
                </div>
                {/* Mobile menu */}
                <ul
                    id="mobile-menu"
                    className="hidden bg-[#0a0a0a] absolute top-full right-0 text-black 
                    flex-col items-center gap-5 p-4 md:hidden min-w-[150px] rounded shadow-amber-50-lg z-50 h-screen ]"
                >
                    <li className="py-6"><Link href="/">Home</Link></li>
                    <li className="py-6"><Link href="/services">Services</Link></li>
                    <li className="py-6"><Link href="/about">AboutUs</Link></li>
                </ul>
            </>
            
        );  
}