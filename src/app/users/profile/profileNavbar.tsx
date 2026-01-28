import Link from "next/link"

import DynamicIcon from "@/components/utill/DynamicIcons";

export default function ProfileNavbar(){
    return(
        <div className="flex justify-between items-center px-2 lg:px-10 lg:py-5 bg-gray-50 shadow-md"> 
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

           <button className="flex items-center px-3 py-1 gap-2 lg:text-xl">
            <DynamicIcon name="CiLogout" className="lg:text-2xl"></DynamicIcon>
                Logout
           </button>


        </div>
    )
}