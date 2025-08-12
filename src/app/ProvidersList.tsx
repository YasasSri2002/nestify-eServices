"use client"
import ProviderCard from "@/components/ui/providerCard";
import DynamicIcon from "@/components/utill/DynamicIcons";
import Link from "next/link";
import { useRef } from "react";
export default function ProvidersList(){

    const providerRef = useRef({
        name: "",
        profilePic: "",
        experties: "",
        address: "",
        services:[""],
        hourlyRate: ""
    });

    return(
        <>
           <div className="h-full">
             <h1 className="text-gray-900 text-4xl lg:text-6xl text-center my-10">Popluar Providers</h1>
            <div className="flex flex-row flex-wrap justify-center gap-5">
                <div>
                    <ProviderCard/>
                </div>
                <div>
                    <ProviderCard/>
                </div>
                <div>
                    <ProviderCard/>
                </div>
                <div>
                    <ProviderCard/>
                </div>
                <div className="flex justify-center items-center w-full  text-gray-500 mt-10 my-2 text-2xl space-x-4">
                    <Link href="" className="flex items-center " >
                    
                    See more
                    <DynamicIcon name="HiArrowSmRight" />
                    </Link>
                    
                </div>
            </div>
           </div>
        </>
    );
}