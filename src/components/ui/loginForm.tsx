
"use client";
import {EyeClosed, Eye , X ,User ,Key,} from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook ,FaUserTie ,FaUser } from "react-icons/fa6";
import Swal from 'sweetalert2'
import { title } from 'process';
import Link from 'next/link';


export default function loginForm(){


    return(
        <>
          <div className="grid justify-items-center items-center w-dvw h-dvh">

              <div className="grid justify-items-center lg:w-1/2 w-screen bg-gray-200 rounded-4xl drop-shadow-2xl">
                <div className='relative m-2 w-full flex justify-end top-2 right-4'>
                    <Link href={"/"}>
                        <X/>
                    </Link>
                </div>

                 <div className="flex gap-2 content-center justify-center my-2">
                    
                    <button className="w-[10em] grid justify-items-center content-center  bg-white shadow-2xl p-2 rounded-2xl border-green-300 hidden:border-4 h-[4em]">
                        <FaUserTie  size={24} className='mb-2'/>
                        provider
                    </button>
                    <button className="w-[10em] grid justify-items-center content-center border-green-300 hidden:border-4 bg-white shadow-2xl p-2 rounded-2xl h-[4em]">
                        <FaUser size={24}  className='mb-2'/>
                        client
                    </button>
                </div>

                <div className="grid justify-items-center content-center space-x-5 w-full mt-3">

                   <div className="flex items-center">
                        <span>
                            <User/>
                        </span>
                        <input type="text" name="userName" 
                        className="bg-white  border-none drop-shadow-2xl focus:bg-gray-100 
                        py-1 px-2 w-[250px] ml-7 rounded-2xl"/>
                   </div>

                    <div className="space-x-8 py-5 relative left-4 flex items-center">
                        <span>
                            <Key/>
                        </span>
                        <input type="password" name="password" 
                                className="bg-white border-none drop-shadow-2xl focus:bg-gray-100 py-1 px-2 w-[250px] rounded-2xl"/>
                        <button className='relative top-0.5 -left-18'> 
                                <EyeClosed/>
                        </button>
                    </div>

                </div>

                <button className="bg-white h-full w-[8em] rounded-2xl cursor-pointer">
                    Login
                </button>

                <div className="grid text-center items-center mt-2  text-sky-700">
                        <Link href="/register">Don't have an account? Sign Up</Link>
                        <Link href="#">Forgot Password?</Link>
                    </div>

                 <div className="flex items-center w-full mb-6 text-gray-500">
                        <hr className="flex-grow border-t  bg-gray-500" />
                        <span className="px-4 text-sm font-medium whitespace-nowrap">Or</span>
                        <hr className="flex-grow border-t  bg-gray-500" />
                    </div>

                     <div className="grid justify-items-center">
                    <button className="flex items-center space-x-3 border-2 px-2 my-2 w-[250px]
                    cursor-pointer">
                        <FcGoogle size={35}/>
                        <h5 className='border-l-1 pl-5'>Sign up with google</h5>
                    </button>

                    <button className="flex items-center space-x-3 border-2 px-2 my-2 w-[250px] cursor-pointer ">
                        <FaSquareFacebook size={35} />
                        <h5 className='border-l-1 pl-5'>Sign up with faceBook</h5>
                    </button>

                </div>

            </div>

            
           

          </div>
        </>
    );
}