
"use client";
import {EyeClosed, Eye , X ,User ,Key} from 'lucide-react';
export default function registerForm(){
    return(
        <>
          <div className="grid justify-items-center items-center h-dvh">

              <div className="grid justify-items-center w-full md:w-1/2 h-2/3 bg-gray-200 rounded-4xl drop-shadow-2xl">
                <div className='absolute left-5 top-5'>
                    <button>
                        <X/>
                    </button>
                </div>
                <div className="justify-items-center content-center space-x-5 w-full mt-3">

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

                <button className="bg-white h-2/3 w-[8em] rounded-2xl">Login</button>
                
                <div className="grid grid-cols-2 gap-2 content-center">
                    <div className="col-1 bg-red-200 w-full h-full">provider</div>
                    <div className="col-2 bg-red-200 w-full h-full">client</div>
                </div>

                <div className="grid text-center items-center  text-sky-700">
                    <a href="#">Don't have an account? Sign Up</a>
                    <a href="#">Forgot Password?</a>
                </div>

                <div className="flex items-center w-full mb-6 text-gray-500 sm:hidden">
                    <hr className="flex-grow border-t  bg-gray-500" />
                    <span className="px-4 text-sm font-medium whitespace-nowrap">Or</span>
                    <hr className="flex-grow border-t  bg-gray-500" />
                </div>

            </div>

           

          </div>
        </>
    );
}