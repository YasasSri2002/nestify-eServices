'use client'

import React, { useState } from "react";

import ProfileNavbar from "../profileNavbar";
import ProfileDashboard from "../dashboard";
import { useParams } from "next/navigation";


export default function UserProfile(){
    
    const params = useParams();

    const userId = params.id as string;

    const [actvePage , setActivePage] = useState("dashboard");

    console.log(userId)

    function renderPage(){
        switch(actvePage){
            case("dashboard"):
                return <ProfileDashboard userId={userId} />
            
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