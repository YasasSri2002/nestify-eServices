"use client";

import Image from "next/image";

export default function Footer(){
    return(
        <>
        <div className="flex flex-col md:flex-row bg-[#121212e1] text-[hsla(0,0%,90%,1)] mt-5">
            <div className="basis-full md:basis-1/3">
                <h1 className="text-center sm:text-1.5xl my-3 font-bold text-white">Nestify</h1>
                <p className="m-4 text-[0.9em]">Connecting homeowners with trusted service providers for all household needs.</p>
                <div className="social-icons space-x-20 flex justify-center m-4">
                    <button><a href="#facebook"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook-icon lucide-facebook "><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a></button>

                    <button><a href="#twitter">
                         <Image
                                src="/icon/X_icon.png"
                                alt="x"
                                width={24}
                                height={24} 
                                className="mix-blend-lighten"
                            />
                        </a></button>

                    <button><a href="#linkedin"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin-icon lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></a></button>
                </div>
            </div>
            <div className="basis-full md:basis-1/3 sm:ml-20">
            <h1 className="my-3 text-center font-semibold text-white">Quick links</h1>
            <ul className="flex-col ml-4 sm:ml-10">
                <li className="my-2"><a href="#">How it Works</a></li>
                <li className="my-2"><a href="#">Browse Services</a></li>
                <li className="my-2"><a href="#">Join as Provider</a></li>
                <li className="my-2"><a href="#">Safety & Trust</a></li>
                <li className="my-2"><a href="#">Help Center</a></li>
            </ul>
            </div>
            <div className="basis-full md:basis-1/3 ">
            <h1 className="my-3 text-center font-semibold text-white">Contact us</h1>
            <div className="my-2 mt-10 ml-4 sm:ml-15">
                <div className="flex space-x-4 sm:space-x-15 my-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone-icon lucide-phone"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>
                    <h2>+94 123-4567</h2>
                </div>
                <div className="flex space-x-4 sm:space-x-15 my-3 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
                    <h2>Services@Nestify.com</h2>
                </div>
                <div className="flex space-x-4 sm:space-x-15 my-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin-icon lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
                    <h2>123 Colombo St, kandy, Sri lanka</h2>
                </div>
            </div>
            </div>
        </div>
        <div className="md:text-1xl bg-[#121212e1] px-5 py-10 flex">
                <div className="w-[99.9%] border-t border-white flex items-center justify-center pt-10">
                    <p className="text-[hsla(0,0%,90%,1)]">&copy; {new Date().getFullYear()} Nestify. All rights reserved.</p>
                </div>
        </div>
        </>

    );
}