"use client";
import Image from "next/image";
import Link from "next/link";

import DynamicIcon from "@/components/utill/DynamicIcons";

function sideMenue(){
        const menue = document.getElementById("mobile-first");
        if(menue) menue.classList.toggle('hidden');
    }

export default function NavBar(){

        return (
          <>
            <div
              id="mynavbar"
              className="navbar flex items-center justify-between text-white p-2 relative bg-[hsla(0,0%,97%,1)] drop-shadow-xl sm:px-6 lg:px-8 w-full "
            >
              <div>
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={150}
                  height={10}
                  className="mx-0 w-auto h-auto max-h-[7rem]"
                />
              </div>

              <ul className="hidden xl:flex gap-4 text-black">
                <li>
                  <Link href="/site-admin">Admin Dashboard</Link>
                </li>
                <li>
                  <Link href="/site-admin/users">users</Link>
                </li>
                <li>
                  <Link href="/site-admin/providers">providers</Link>
                </li>
                <li>
                  <Link href="/site-admin/payments">payments</Link>
                </li>
              </ul>
              <button onClick={sideMenue} className="xl:hidden">
                <DynamicIcon name="BiAlignJustify"/>
              </button>
            </div>

            <div
              id="mobile-first"
              className="hidden  justify-end absolute z-50 -top-0 right-0"
            >
              <div className="bg-[hsla(0,0%,97%,1)] drop-shadow-2xl rounded-l-2xl grid w-50 h-dvh shadow-2xl">
                <div className="justify-self-end max-h-5 mt-5 relative right-5">
                  <button onClick={sideMenue}>
                    <DynamicIcon name="BiWindowClose"></DynamicIcon>
                  </button>
                </div>
                <div className="absolute mt-20 ml-5">
                  <ul className="mt-0">
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
                  </ul>
                </div>
              </div>
            </div>
          </>
        );  
}