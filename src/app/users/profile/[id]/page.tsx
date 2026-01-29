'use client'

import { useState } from "react";

import ProfileNavbar from "../profileNavbar";


export default function UserProfile(){

    const [actvePage , setActivePage] = useState("dashboard");

    function renderPage(){
        switch(actvePage){
            case("notification"):
                return <ProfileNavbar/>
            
        }
    }

    return(
      
        <div>
            <ProfileNavbar/>
        </div>
        
    );
}