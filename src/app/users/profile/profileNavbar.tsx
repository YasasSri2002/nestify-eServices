'use client';
import Link from "next/link"
import DynamicIcon from "@/components/utill/DynamicIcons";

function handleMobileMenue(){
    const mobileMenue = document.getElementById("mobile-menu")
    mobileMenue?.classList.toggle('hidden')
}

export default function ProfileNavbar(){
    return(
        <div className="flex justify-between items-center px-2 lg:px-10 lg:py-5 bg-gray-50 shadow-md h-25"> 
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
                    <Link href="">dashboard</Link>
                </li>
                <li>
                    <Link href="">security</Link>
                </li>
                <li>
                    <Link href="">bookings</Link>
                </li>
                <li>
                    <Link href="">perferences</Link>
                </li>
            </ul>

           <div className="flex gap-5">
                <button className="flex items-center px-3 py-1 gap-2 lg:text-xl">
                    <DynamicIcon name="CiLogout" className="lg:text-2xl"></DynamicIcon>
                        Logout
                </button>
                <button className="md:hidden" onClick={handleMobileMenue} >
                    <DynamicIcon name="IoMenu"></DynamicIcon>
                </button>
           </div>

            <div id="mobile-menu" className="hidden absolute top-12 w-[98%]">
                <div  className="grid gap-2  bg-black text-white">
                    <div className="flex justify-end text-white py-2 px-1" >
                        <button onClick={handleMobileMenue}>
                            <DynamicIcon name="IoIosClose" className="w-5 h-5"></DynamicIcon>
                        </button>
                    </div>
                    <ul className="grid gap-8 justify-items-center py-5">
                        <li>
                            <Link href="">dashboard</Link>
                        </li>
                        <li>
                            <Link href="">security</Link>
                        </li>
                        <li>
                            <Link href="">bookings</Link>
                        </li>
                        <li>
                            <Link href="">preferences</Link>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}