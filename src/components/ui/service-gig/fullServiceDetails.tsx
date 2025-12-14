'use client'

import Image from "next/image";

import DynamicIcon from "@/components/utill/DynamicIcons";
import { ServiceGigResponseDto } from "@/dto/response/ServiceGigResponseDto";

function showProviderDetails(){
        const providerDetailsPanel = document.getElementById(`providerDetails`);
        providerDetailsPanel?.classList.toggle('sr-only')
    }

export default function FullServiceGigsDetails({gig}:
     {readonly gig: ServiceGigResponseDto})

     {

    return(
        <div className="grid grid-cols-6">
            <div className="h-full sm:hidden bg-gray-300 grid justify-items-center content-between py-2">
                <button onClick={showProviderDetails}>
                    <DynamicIcon name="BiMenu" className="text-3xl"/>
                </button>
                <div className="w-10 h-10 rounded-full">
                    <Image src={"https://avatar.iran.liara.run/public/boy"} 
                        width={100}
                        height={100}
                        alt="provider's profile picture"/>
                </div>
            </div>

           <div id="providerDetails" className="col-span-2 border-2 border-red-300 grid justify-items-center order-2 
                    sm:order-1 absolute bg-gray-300 sm:bg-white/5 z-50 sr-only sm:not-sr-only gap-5 sm:p-4 h-full">
                <div className="w-full flex justify-end sm:sr-only ">
                    <button onClick={showProviderDetails}>
                        <DynamicIcon name="IoMdClose" className="text-xl"/>
                    </button>
                </div>
                <div className="w-30 h-30 rounded-full">
                    <Image src={"https://avatar.iran.liara.run/public/boy"} 
                        width={100}
                        height={100}
                        alt="provider's profile picture"/>
                </div>
                <div className="grid gap-5">
                    <div className="flex space-x-4 justify-center">
                        <h1 className="md:text-xl">
                            Get to know<span className="capitalize"> {gig.provider.userName}</span>
                        </h1>
                        {
                            gig.provider.isVerified ? 
                            <DynamicIcon name="BiBadgeCheck" className="text-green-400 text-2xl" /> : ""
                        }
                    </div>
                    <p>{gig.provider.shortDescription}</p>
                </div>
                <div className="grid lg:grid-cols-2 gap-4">
                    <div className="lg:col-1">
                        <h1>Experience:{gig.provider.experience}</h1>
                        <h1>Main Category: {gig.provider.expertise}</h1>
                        <h1>Other Categories: </h1>
                    </div>
                    <div className="lg:col-2 gap-2 grid">
                        <h1>Up to date {gig.provider.jobCount} jobs has successfully compeleted</h1>
                        
                        <div className="grid justify-items-center w-fit gap-2">
                            <h1>Contacts</h1>
                            <div className="flex justify-between w-full">
                                <h1>Phone:</h1> <h1>{gig.provider.contactNo}</h1>
                            </div>
                             <div className="flex justify-between w-full">
                                <h1>Email:</h1> <h1>{gig.provider.email}</h1>
                            </div>
                        </div>
                    </div>
                    
                </div>
           </div>
           <div className="col-span-5 sm:col-span-4 border-2 border-blue-300 order-1 sm:order-2 p-5">
                <h1 className="lg:text-2xl text-center capitalize mt-2 mb-10 ">{gig.title}</h1>
                <div className="grid gap-5 md:grid-cols-2">
                       <div className="md:col-1 grid gap-4 ">
                             <div className="grid gap-2">
                                <h1 className="lg:text-2xl ">About this gig</h1>
                                <p className="text-gray-600 md:text-lg">{gig.fullDescription}</p>
                            </div>
                            
                        </div> 
                        <div className="md:col-2 sticky grid content-center h-full ">
                            <div className="bg-gray-300 p-5 rounded-2xl">
                                <h1 className="lg:text-2xl">Abour Prices</h1>
                                <div className="ml-3">
                                    <h1>The base price: {gig.basePrice} {gig.currency}</h1>
                                    <h1>How price adding: {gig.priceType}</h1>
                                </div>
                            </div>
                        </div>  
                </div>
                <div className="flex space-x-5 w-full items-center  my-10">
                    <h1>Category: </h1>  
                    <h1 className="bg-gray-200 rounded-xl px-4 py-1">{gig.category.name}</h1>
                </div>
                 
           </div>
        </div>
    )
}