
"use client";
import {EyeClosed, Eye , X ,User ,Key} from 'lucide-react';
export default function registerForm(){
    return(
        <>
          <div className="grid sm:grid-cols-2 justify-items-center content-center h-dvh">

              <div className="grid col-1 justify-items-center relative top-25 w-[500px] h-[400px] bg-gray-200 rounded-4xl drop-shadow-2xl">
                <div className='absolute top-5 left-5'>
                    <button>
                        <X/>
                    </button>
                </div>
                <div className="flex-col justify-items-center space-x-5 w-full px-10 pt-5 my-6">

                   <div className="space-x-6 py-5">
                        <span className='relative top-7 -left-8'>
                            <User/>
                        </span>
                        <input type="text" name="userName" 
                        className="bg-white  border-none drop-shadow-2xl focus:bg-gray-100 
                        py-1 px-2 w-[250px] ml-7 rounded-2xl"/>
                   </div>

                    <div className="space-x-8 py-5 relative left-4 flex content-center">
                        <span className='relative top-2 -left-6'>
                            <Key/>
                        </span>
                        <input type="password" name="password" 
                                className="bg-white border-none drop-shadow-2xl focus:bg-gray-100 py-1 px-2 w-[250px] rounded-2xl"/>
                        <button className='relative top-0.5 -left-18'> 
                                <EyeClosed/>
                        </button>
                    </div>
                </div>

                <div className="flex justify-center space-x-4 mb-5">
                    <button className="bg-white h-[60px] w-[8em] rounded-2xl">Login</button>
                </div>

                <div className="grid text-center my-2 text-sky-700">
                    <a href="#">Don't have an account? Sign Up</a>
                    <a href="#">Forgot Password?</a>
                </div>

                <div className="flex items-center w-full mb-6 text-gray-500 sm:hidden">
                    <hr className="flex-grow border-t  bg-gray-500" />
                    <span className="px-4 text-sm font-medium whitespace-nowrap">Or</span>
                    <hr className="flex-grow border-t  bg-gray-500" />
                </div>

            </div>

            <div className='col-2 w-full h-screen bg-amber-300'>
            

            </div>

           

          </div>
        </>
    );
}