"use client";

export default function registerForm(){
    return(
        <>
          <div className="grid justify-items-center content-center h-dvh">
              <div className="grid justify-items-center w-[500px] h-auto bg-gray-200 rounded-4xl drop-shadow-2xl">
                <div className="grid grid-row-2 justify-center space-x-5 w-full px-10 pt-5 my-6">
                   <div className="row-1 space-x-5 py-6">
                        <label htmlFor="userName">User name</label>
                        <input type="text" name="userName" 
                        className="border-amber-700 border-2 w-[250px] rounded-2xl"/>
                   </div>
                    <div className="row-2 space-x-7 py-5">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" 
                                className="border-amber-700 border-2 w-[250px] rounded-2xl"/>
                    </div>
                </div>

                <div className="flex justify-center space-x-4 mb-10">
                    <button className="bg-white px-8 py-1 rounded-2xl">Login</button>
                    <button className="bg-white px-10 py-1 rounded-2xl">Exit</button>
                </div>

                <div className="grid text-center my-6">
                    <a href="#">Don't have an account? Sign Up</a>
                    <a href="#">Forgot Password?</a>
                </div>

            </div>
          </div>
        </>
    );
}