'use client'

import React, { useEffect, useState } from "react";

import ProfileNavbar from "../profileNavbar";
import ProfileDashboard from "../dashboard";
import { useParams } from "next/navigation";
import { getUserById } from "@/app/api-calls/users/by-id/route";
import { UserResponseDto } from "@/dto/UserDto";


export default function UserProfile(){
    
    const params = useParams();

    const userId = params.id as string;

    const [actvePage , setActivePage] = useState("dashboard");
    const[user,setUser] = useState<UserResponseDto>({} as UserResponseDto);

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

    function renderPage(){
        switch(actvePage){
            case("dashboard"):
                return <ProfileDashboard user={user} />
            
        }
    }

    return(
      
        <div>
            <ProfileNavbar/>
            <div className="my-5 lg:my-10">
                {
                    renderPage()
                }
            </div>
        </div>
        
    );
}