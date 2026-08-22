"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DynamicIcon from "../utill/DynamicIcons";

import { AlignJustify, X } from 'lucide-react';
import { useSessionUser, useLogout } from "@/hooks/queries/useAuth";
import Swal from "sweetalert2";

export default function NavBar() {
  const router = useRouter();
  const { data: session } = useSessionUser();
  const logoutMutation = useLogout();
  const [toggleSideMenu, setToggleSideMenu] = useState(false);

  const userEmail = session?.userEmail ?? '';
  const userId = session?.userId ?? '';
  let roles: string[] = ['notLogin'];
  if (session?.roles) {
    try {
      roles = JSON.parse(session.roles);
    } catch {
      roles = ['notLogin'];
    }
  }

  const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL;
  const registrationUrl = "/register";

  const handleLogOut = async () => {
    Swal.fire({
      title: "Please wait while logging out...",
      color: "#1E293B",
      background: "#fff",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const res = await logoutMutation.mutateAsync(userId);
      console.log("Logout result:", res);

      Swal.close();

      await Swal.fire({
        icon: 'success',
        title: "Successfully Logged out",
        color: "#1E293B",
        background: "#fff",
        confirmButtonColor: '#1D4ED8',
        confirmButtonText: 'OK',
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          popup: 'border border-[#EAF2F1]'
        }
      });

      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      console.error("Logout failed:", err);

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
  };

  const dashboardRenderingDesktop = () => {
    if (roles.some(role => role === "user")) {
      return (
        <div className="hidden xl:flex items-center">
          <Link
            href={userId ? `/users/profile/${userId}` : '/'}
            className="mb-2 md:m-2 lg:m-2 inline-flex items-center justify-center rounded-lg border border-[#1D4ED8] text-[#1D4ED8] w-30 py-2 px-5 hover:bg-[#DBEAFE] active:scale-95 transition-all duration-200"
          >
            Dashboard
          </Link>
          <button
            className="lg:m-2 md:m-2 rounded-lg bg-[#1D4ED8] w-30 py-2 px-5 hover:bg-[#2563EB] active:scale-95 text-white flex justify-center items-center gap-2 transition-all duration-200 cursor-pointer"
            onClick={handleLogOut}
          >
            <DynamicIcon name='CiLogout' />
            Log out
          </button>
        </div>
      );
    }

    if (roles.some(role => role === "provider")) {
      return (
        <div className="hidden xl:flex items-center">
          <Link
            href="/providers/dashboard"
            className="mb-2 md:m-2 lg:m-2 inline-flex items-center justify-center rounded-lg border border-[#1D4ED8] text-[#1D4ED8] w-30 py-2 px-5 hover:bg-[#DBEAFE] active:scale-95 transition-all duration-200"
          >
            Dashboard
          </Link>
          <button
            className="lg:m-2 md:m-2 rounded-lg bg-[#1D4ED8] w-30 py-2 px-5 hover:bg-[#2563EB] active:scale-95 text-white flex justify-center items-center gap-2 transition-all duration-200 cursor-pointer"
            onClick={handleLogOut}
          >
            <DynamicIcon name='CiLogout' />
            Log out
          </button>
        </div>
      );
    }

    if (roles.some(role => role === "admin")) {
      return (
        <div className="hidden xl:flex items-center">
          <Link
            href="/site-admin"
            className="mb-2 md:m-2 lg:m-2 inline-flex items-center justify-center rounded-lg border border-[#1D4ED8] text-[#1D4ED8] w-30 py-2 px-5 hover:bg-[#DBEAFE] active:scale-95 transition-all duration-200"
          >
            Dashboard
          </Link>
          <button
            className="lg:m-2 md:m-2 rounded-lg bg-[#1D4ED8] w-30 py-2 px-5 hover:bg-[#2563EB] active:scale-95 text-white flex justify-center items-center gap-2 transition-all duration-200 cursor-pointer"
            onClick={handleLogOut}
          >
            <DynamicIcon name='CiLogout' />
            Log out
          </button>
        </div>
      );
    }

    if (roles.some(role => role === 'notLogin')) {
      return (
        <div className="xl:flex hidden items-center">
          <Link
            href={loginUrl ?? "/login"}
            className="mb-2 md:m-2 lg:m-2 inline-flex items-center justify-center rounded-lg border border-[#1D4ED8] text-[#1D4ED8] w-25 py-2 px-5 hover:bg-[#DBEAFE] active:scale-95 transition-all duration-200"
          >
            Log in
          </Link>
          <Link
            href={registrationUrl}
            className="lg:m-2 md:m-2 inline-flex items-center justify-center rounded-lg text-white bg-[#1D4ED8] w-25 py-2 px-5 hover:bg-[#2563EB] active:scale-95 transition-all duration-200"
          >
            Register
          </Link>
        </div>
      );
    }
  };

  const dashboardRenderingMobile = () => {
    if (roles.some(role => role === "user")) {
      return (
        <div className="grid justify-items-center h-full md:h-1/2 content-end text-black gap-2">
          <Link
            href={userId ? `/users/profile/${userId}` : '/'}
            onClick={() => setToggleSideMenu(false)}
            className="inline-flex items-center justify-center rounded-lg border border-[#1D4ED8] text-[#1D4ED8] py-2 px-5 hover:bg-[#DBEAFE] w-30 transition-all duration-200"
          >
            Dashboard
          </Link>
          <button
            className="rounded-lg bg-[#1D4ED8] py-2 px-5 hover:bg-[#2563EB] w-30 flex justify-center items-center gap-2 text-white transition-all duration-200 cursor-pointer"
            onClick={() => {
              setToggleSideMenu(false);
              handleLogOut();
            }}
          >
            <DynamicIcon name='CiLogout' />
            Log out
          </button>
        </div>
      );
    }

    if (roles.some(role => role === "provider")) {
      return (
        <div className="grid justify-items-center h-full md:h-1/2 content-end text-black gap-2">
          <Link
            href="/providers/dashboard"
            onClick={() => setToggleSideMenu(false)}
            className="inline-flex items-center justify-center rounded-lg border border-[#1D4ED8] text-[#1D4ED8] py-2 px-5 hover:bg-[#DBEAFE] w-30 transition-all duration-200"
          >
            Dashboard
          </Link>
          <button
            className="rounded-lg bg-[#1D4ED8] py-2 px-5 hover:bg-[#2563EB] w-30 flex justify-center items-center gap-2 text-white transition-all duration-200 cursor-pointer"
            onClick={() => {
              setToggleSideMenu(false);
              handleLogOut();
            }}
          >
            <DynamicIcon name='CiLogout' />
            Log out
          </button>
        </div>
      );
    }

    if (roles.some(role => role === "admin")) {
      return (
        <div className="grid justify-items-center h-full md:h-1/2 content-end text-black gap-2">
          <Link
            href="/site-admin"
            onClick={() => setToggleSideMenu(false)}
            className="inline-flex items-center justify-center rounded-lg border border-[#1D4ED8] text-[#1D4ED8] py-2 px-5 hover:bg-[#DBEAFE] w-30 transition-all duration-200"
          >
            Dashboard
          </Link>
          <button
            className="rounded-lg bg-[#1D4ED8] py-2 px-5 hover:bg-[#2563EB] w-30 flex justify-center items-center gap-2 text-white transition-all duration-200 cursor-pointer"
            onClick={() => {
              setToggleSideMenu(false);
              handleLogOut();
            }}
          >
            <DynamicIcon name='CiLogout' />
            Log out
          </button>
        </div>
      );
    }

    if (roles.some(role => role === 'notLogin')) {
      return (
        <div className="grid justify-items-center h-full md:h-1/2 content-end text-black gap-2">
          <Link
            href={loginUrl ?? "/login"}
            onClick={() => setToggleSideMenu(false)}
            className="inline-flex items-center justify-center rounded-lg border border-[#1D4ED8] text-[#1D4ED8] py-2 px-5 hover:bg-[#DBEAFE] w-25 active:scale-95 transition-all duration-200"
          >
            Log in
          </Link>
          <Link
            href={registrationUrl}
            onClick={() => setToggleSideMenu(false)}
            className="inline-flex items-center justify-center rounded-lg bg-[#1D4ED8] py-2 px-5 hover:bg-[#2563EB] w-25 active:scale-95 text-white transition-all duration-200"
          >
            Register
          </Link>
        </div>
      );
    }
  };

  return (
    <>
      <div
        id="mynavbar"
        className="flex items-center justify-between text-white p-2 relative 
              bg-white border-b border-[#EAF2F1] 
              shadow-[0_1px_3px_rgba(10,25,47,0.06)] sm:px-6 lg:px-8 w-full h-20 "
      >
        <Link id="logo" href="/" className="cursor-pointer">
          <Image
            src="/logo.png"
            alt="Logo"
            width={150}
            height={10}
            className="mx-0 w-auto h-auto max-h-28"
          />
        </Link>

        <ul className="hidden xl:flex gap-4 text-[#475569]">
          <li>
            <Link href="/" className="hover:text-[#1D4ED8] transition-colors">Home</Link>
          </li>
          <li>
            <Link href="/service-gigs" className="hover:text-[#1D4ED8] transition-colors">Services</Link>
          </li>
          <li>
            <Link href="/providers" className="hover:text-[#1D4ED8] transition-colors">Service providers</Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-[#1D4ED8] transition-colors">About Us</Link>
          </li>
        </ul>
        {
          dashboardRenderingDesktop()
        }
        <button onClick={() => setToggleSideMenu(!toggleSideMenu)} className="xl:hidden cursor-pointer" aria-label="Toggle menu">
          <AlignJustify size={34} stroke="#1E293B" />
        </button>
      </div>

      <div
        id="mobile-first"
        className={`${toggleSideMenu ? 'justify-end absolute z-50 top-0 right-0 xl:hidden' : 'hidden'}`}
      >
        <div className="bg-white drop-shadow-2xl rounded-l-2xl grid w-50 h-dvh shadow-[0_12px_32px_rgba(10,25,47,0.12)]">
          <div className="justify-self-end max-h-5 mt-5 relative right-5">
            <button onClick={() => setToggleSideMenu(false)} className="cursor-pointer" aria-label="Close menu">
              <X size={24} stroke="#1E293B" />
            </button>
          </div>
          <div className="absolute mt-20 ml-5">
            <ul className="mt-0 text-[#475569]">
              <li className="pb-2">
                <Link href="/" onClick={() => setToggleSideMenu(false)}>Home</Link>
              </li>
              <li className="py-2">
                <Link href="/service-gigs" onClick={() => setToggleSideMenu(false)}>Services</Link>
              </li>
              <li className="py-2">
                <Link href="/providers" onClick={() => setToggleSideMenu(false)}>Service providers</Link>
              </li>
              <li className="py-2">
                <Link href="/about" onClick={() => setToggleSideMenu(false)}>About us</Link>
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