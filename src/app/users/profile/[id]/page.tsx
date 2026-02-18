'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";


import ProfileDashboard from "../dashboard";
import { useParams } from "next/navigation";
import { getUserById } from "@/app/api-calls/users/by-id/route";
import { UserResponseDto } from "@/dto/UserDto";
import DynamicIcon from "@/components/utill/DynamicIcons";
import UserSecurityPage from "../securityPage";
import BookingList from "../bookingList";
import { LogoutUser } from "@/app/api-calls/auth/logout/route";



export default function UserProfile(){
    
    const params = useParams();

    const userId = params.id as string;

    const [actvePage , setActivePage] = useState("dashboard");
    const[user,setUser] = useState<UserResponseDto>({} as UserResponseDto);
    const[showMobileMenue,setShowMobileMenue] = useState(false);

    useEffect(()=>{
        async function getUserData(id:string){
            try{
                const response = await getUserById(id);
                setUser(response);
                console.log(user,"from get user profile")
            }catch(err:unknown){
                console.log(err);
            }
        }
        getUserData(userId);
    },[])

    console.log(userId)

    async function handleLogOut(){
        const response = await LogoutUser(userId);
        window.location.replace("/")
        console.log("logout user" + response);

    }

    function renderPage(){
        switch(actvePage){
            case("dashboard"):
                return <ProfileDashboard user={user} />
            case("security"):
                return <UserSecurityPage/>
            case("bookings"):
                return <BookingList id={userId}/>
            
        }
    }

    return(
      
        <div>
            <nav className="flex justify-between items-center px-2 lg:px-10 lg:py-5 bg-gray-50 shadow-md h-25"> 
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
                        <button onClick={()=>setActivePage("dashboard")} 
                        className="cursor-pointer">
                            dashboard
                        </button >
                    </li>
                    <li>
                        <button onClick={()=>setActivePage("security")} 
                        className="cursor-pointer">
                            security
                        </button >
                    </li>
                    <li>
                        <button onClick={()=>setActivePage("bookings")} 
                        className="cursor-pointer">
                            bookings
                        </button >
                    </li>
                    <li>
                        <button  onClick={()=>setActivePage("dashboard")} 
                        className="cursor-pointer">
                            perferences
                        </button >
                    </li>
                </ul>

                <div className="flex gap-5">
                        <button className="flex items-center px-3 py-1 gap-2 lg:text-xl active:scale-95" onClick={handleLogOut}>
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
                                <button onClick={()=>setActivePage("dashboard")}
                                 className="cursor-pointer">
                                    dashboard
                                </button>
                            </li>
                            <li>
                                <button onClick={()=>setActivePage("security")}
                                 className="cursor-pointer">
                                    security
                                </button>
                            </li>
                            <li>
                                <button onClick={()=>setActivePage("bookings")}
                                 className="cursor-pointer">
                                    bookings
                                </button>
                            </li>
                            <li>
                                <button onClick={()=>setActivePage("dashboard")}
                                 className="cursor-pointer">
                                    preferences
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>
            <div className="my-5 lg:my-10 ">
                {
                    renderPage()
                }
            </div>
        </div>
        
    );
}