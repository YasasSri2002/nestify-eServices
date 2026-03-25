'use client'

import { useEffect, useState } from "react";

import ProfileDashboard from "./dashboard/dashboard";
import { useParams, useRouter } from "next/navigation";
import { getUserById } from "@/app/api-calls/users/by-id/route";
import { UserResponseDto } from "@/dto/UserDto";


import { ProfileNavBar } from "./profileNavBar";




export default function UserProfile(){
    
    const params = useParams();
    const userId = params.id as string;
    const[user,setUser] = useState<UserResponseDto>({} as UserResponseDto);

    useEffect(()=>{
        async function getUserData(){
            try{
                const response = await getUserById();
                setUser(response);
                console.log(user,"from get user profile")
            }catch(err:unknown){
                console.log(err);
            }
        }
        getUserData();
    },[])

    console.log(userId)



    return(

            <ProfileDashboard user={user}/>

        
    );
}