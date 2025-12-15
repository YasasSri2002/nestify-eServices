
'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ProviderWithAllDetails } from "@/dto/ProviderDto";
import DynamicIcon from "@/components/utill/DynamicIcons";

function showProviderDetails(){
        const providerDetailsPanel = document.getElementById(`providerDetails`);
        providerDetailsPanel?.classList.toggle('sr-only')
    }


export default function FullDetailsOfAProvider({providerDetails}: {readonly providerDetails:ProviderWithAllDetails}){
    return(
            <div className="grid grid-cols-6">
                <div className="h-full sm:hidden bg-gray-300 grid justify-items-center content-between py-2">
                <button onClick={showProviderDetails}>
                    <DynamicIcon name="BiMenu" className="text-3xl"/>
                </button>
                <div>
                    <Image src={"/user.jpg"} 
                        width={50}
                        height={100}
                        alt="provider's profile picture"
                        className='rounded-full w-10 h-10'
                        />
                </div>
            </div>
                <div id="providerDetails" 
                    className="sr-only sm:not-sr-only absolute z-10 md:col-span-2 border-2 border-red-400 w-full 
                            bg-gray-200 h-dvh p-5 ">
                    <div className='w-full flex justify-end sm:hidden'>
                        <button onClick={showProviderDetails}>
                            <DynamicIcon name='MdClose' />
                        </button>
                    </div>
                    <div>
                        <div className='w-full flex justify-center'>
                            <Image src={"/user.jpg"} 
                                width={50}
                                height={100}
                                alt="provider's profile picture"
                                className='rounded-full w-30 h-30'
                            />
                        </div>
                        <div className='grid justify-items-center m-5 gap-4'>
                            <div className="flex justify-center items-center space-x-2">
                                <h1>{providerDetails.providerDto.userName}</h1>
                                {   
                                    providerDetails.providerDto.isVerified ?
                                    <DynamicIcon name='BiBadgeCheck' className='text-green-500 text-2xl'/> : ''
                                }
                            </div>
                            <p>{providerDetails.providerDto.shortDescription}</p>
                            <div className="flex space-x-5">
                                <h1>Experience</h1>
                                <h1>{providerDetails.providerDto.experience}</h1>
                            </div>
                            <h1>Up to date {providerDetails.providerDto.jobCount} jobs has been compeleted </h1>
                            <div className='w-full'>
                                <div className="flex justify-between items-center w-full border-b-1 my-2">
                                    <h1>Email</h1>
                                    <h1>{providerDetails.providerDto.email}</h1>
                                </div>
                                 <div className="flex justify-between items-center w-full border-b-1 my-2">
                                    <h1>Contact No</h1>
                                    <h1>{providerDetails.providerDto.contactNo}</h1>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div className="col-span-5 md:col-span-4 border-2 border-blue-800">
                    <div className='m-5' >
                        <h1>Service gig titles</h1>
                        <div className="ml-5">
                            {
                            providerDetails.gigs.map((gig,i) => 
                                    <Link 
                                        href={`/service-gigs/details/${gig.id}`} 
                                        key={gig.id}
                                        
                                        >
                                                 {i+1}. <span className='text-blue-600 underline'>{gig.title} </span>
                                    </Link>
                            )
                        }
                        </div>
                    </div>
                </div>
            </div>
    )
}