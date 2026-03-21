'use client'

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

import DynamicIcon from "@/components/utill/DynamicIcons"
import { LogoutUser } from "@/app/api-calls/auth/logout/route";

import Swal from "sweetalert2"


export function ProfileNavBar(){
    const params = useParams();
    const userId = params.id as string;
    const router = useRouter();
    
    const[showMobileMenue,setShowMobileMenue] = useState(false);

    async function handleLogOut(){
            
            Swal.fire({
                title: "Logging Out..!",
                color: "#000000",
                background: "#fff",
                allowOutsideClick: false,
                didOpen: ()=> {
                    Swal.showLoading();
                },
    
            })
    
           try{
    
                const response = await LogoutUser(userId);
                window.location.replace("/")
                console.log("logout user" + response);
    
                Swal.close();
    
                Swal.fire({
                    text: "Successfully log out",
                    icon: "success",
                    color: "#88E788",
                    background: "#fff",
                    timer: 2500,
                    timerProgressBar: true,
                })
    
                
           }catch(err: unknown){
             console.log(err);
    
             
            Swal.fire({
                icon: 'error',
                title: 'Logging out Failed',
                text: err instanceof Error ? err.message : 'An unexpected error occurred.',
                background: '#fff',
                color: '#000000',
                confirmButtonColor: '#dc2626',
                customClass: {
                    popup: 'border border-gray-700'
                }
            });
    
        }
    }


    

    return(
        <nav className="flex justify-between items-center px-2 lg:px-10 lg:py-5 bg-gray-50 shadow-md h-25 mb-5"> 
                {/* left-side */}
                <div className="flex items-center gap-5">
                    <button>
                        <DynamicIcon name="FaArrowLeft" className="lg:text-2xl"></DynamicIcon>
                    </button>
                    <div>
                        <h1 className="text-md lg:text-xl">My Profile</h1>
                        <h3 className="text-sm lg:text-md">Manage your account and preferences</h3>
                    </div>
                </div>

                <ul className="hidden md:flex gap-5">
                    <li>
                        <button onClick={()=> router.push(`/users/profile/${userId}`)} 
                        className="cursor-pointer">
                            dashboard
                        </button >
                    </li>
                    <li>
                        <button onClick={()=> router.push(`/users/profile/${userId}/security`)} 
                        className="cursor-pointer">
                            security
                        </button >
                    </li>
                    <li>
                        <button onClick={()=>router.push(`/users/profile/${userId}/booking`)} 
                        className="cursor-pointer">
                            bookings
                        </button >
                    </li>
                    <li>
                        <button  onClick={()=>router.push(`/users/profile/${userId}/perferences`)} 
                        className="cursor-pointer">
                            perferences
                        </button >
                    </li>
                </ul>

                <div className="flex gap-5">
                        <button className="flex items-center px-3 py-1 gap-2 lg:text-xl active:scale-95" 
                            onClick={handleLogOut}>
                            <DynamicIcon name="CiLogout" className="lg:text-2xl"></DynamicIcon>
                                Logout
                        </button>
                        <button className="md:hidden" onClick={()=>setShowMobileMenue(!showMobileMenue)} >
                            <DynamicIcon name="IoMenu"></DynamicIcon>
                        </button>
                </div>

                <div id="mobile-menu" className={`${showMobileMenue ? 'absolute top-25 w-full right-1' : 'hidden'}`}>
                    <div  className="grid gap-2  bg-white text-black">
                        <div className="flex justify-end text-white py-2 px-1" >
                            <button onClick={()=> setShowMobileMenue(!showMobileMenue)}>
                                <DynamicIcon name="IoIosClose" className="w-5 h-5 text-black"></DynamicIcon>
                            </button>
                        </div>
                        <ul className="grid gap-8 justify-items-center py-5">
                            <li>
                                <button onClick={()=> router.push(`/users/profile/${userId}`)}
                                 className="cursor-pointer">
                                    dashboard
                                </button>
                            </li>
                            <li>
                                <button onClick={()=>router.push(`/users/profile/${userId}/security`)}
                                 className="cursor-pointer">
                                    security
                                </button>
                            </li>
                            <li>
                                <button onClick={()=>router.push(`/users/profile/${userId}/booking`)}
                                 className="cursor-pointer">
                                    bookings
                                </button>
                            </li>
                            <li>
                                <button onClick={()=>router.push(`/users/profile/${userId}/perferences`)}
                                 className="cursor-pointer">
                                    preferences
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>
    )
}