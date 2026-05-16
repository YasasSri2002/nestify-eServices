'use client'
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

import { ServiceGigResponseDto } from "@/dto/response/ServiceGigResponseDto";
import DynamicIcon from '@/components/utill/DynamicIcons';
import  { useRouter } from 'next/navigation';
import { getRatingOfGigById } from '@/app/api-calls/gig/average-rating/route';




export default function ServiceGigCard(
    { serviceGig, isEdit }: { readonly serviceGig: ServiceGigResponseDto , isEdit? : boolean }
) {

    const router = useRouter(); 

    const[activeMenu,setActiveMenu] =useState<string | null>();
    const[averageRating,setAverageRating] =useState('');
    const[totalReviews,setTotalReviews]= useState('')
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(()=>{
                async function fetchData(){
                    try{
                        const response = await getRatingOfGigById(serviceGig.id);
                        setAverageRating(response['average']);
                        setTotalReviews(response['total reviews'])
                        
                        
                    }catch(err:any){
                        console.log(err);
                    }
                }
                fetchData();
            },[])


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setActiveMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function getCategoryTag(value: string) {
        switch (value) {
            case ('cleaning'): {
                return (
                    <span className="bg-green-100 text-green-800 text-sm 
                         px-2.5 py-1 rounded-lg">{value}</span>
                )
            }
            case 'plumbing': {
                return (
                    <span className="bg-blue-100 text-blue-800 text-sm 
                         px-2.5 py-1 rounded-lg">{value}</span>
                )
            }
            case 'electrical': {
                return (
                    <span className="bg-yellow-100 text-yellow-800 text-sm 
                         px-2.5 py-1 rounded-lg">{value}</span>
                )
            }
            case 'gardening': {
                return (
                    <span className="bg-green-100 text-green-800 text-sm 
                         px-2.5 py-1 rounded-lg">{value}</span>
                )
            }
            default:
                return null
        }

    }

    return (
        <div className="mx-5 grid gap-5 shadow-2xl rounded-2xl group">
            <div className='relative overflow-hidden rounded-t-xl'>
                {
                    isEdit && 
                    <div className="flex justify-between px-4 w-full absolute top-5  text-sm z-50">
                        {serviceGig.isActive ? <span className="bg-green-100 text-green-800 text-sm 
                         px-2.5 py-1 rounded-lg">• Active</span> :
                         <span className="bg-red-100 text-red-800 text-sm 
                         px-2.5 py-1 rounded-lg">○ Inactive</span> 
                         }
                         <button
                            onClick={() => setActiveMenu(activeMenu === serviceGig.id ? null : 
                                    serviceGig.id)}
                            className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur 
                                flex items-center justify-center hover:bg-white transition-colors 
                            shadow-sm"
                        >
                            <DynamicIcon name='IoMdMore' className="w-4 h-4 text-[#6B7280]" />
                        </button>
                        {activeMenu === serviceGig.id && (
                            <div className="absolute right-2 top-9 w-36 bg-white rounded-xl border
                                 border-[#EAECF0] shadow-[0_4px_20px_rgba(0,0,0,0.12)] 
                                 overflow-hidden z-10"
                                 ref={menuRef}
                                 >
                            <button className="w-full flex items-center gap-2 px-3 py-2.5 
                                hover:bg-[#F8F9FB] transition-colors text-[12px]">
                                <DynamicIcon name='MdOutlineRemoveRedEye' 
                                    className="w-3.5 h-3.5 text-[#6B7280]" /> 
                                    Preview
                            </button>
                            <button className="w-full flex items-center gap-2 px-3 py-2.5 
                                hover:bg-[#F8F9FB] transition-colors text-[12px]">
                                <DynamicIcon name='MdOutlineModeEdit' 
                                    className="w-3.5 h-3.5 text-[#3B6FE8]" /> 
                                    Edit
                            </button>
                            <button className="w-full flex items-center gap-2 px-3 py-2.5 
                                hover:bg-red-50 transition-colors text-red-600 text-[12px]">
                                <DynamicIcon name='FaRegTrashAlt' className="w-3.5 h-3.5" />
                                 Delete
                            </button>
                            </div>
                        )}
                    </div>
                    
                }
                <img src="/cleaning-poster.jpg" alt="" className="w-full h-full object-cover 
                transition-transform duration-500 group-hover:scale-105" />
                <div className="flex justify-end w-full text-sm relative -top-10 right-3 ">
                    <div className="flex bg-white py-1 px-3 rounded-md gap-0.5">
                        <h1>{serviceGig.currency}:</h1><h1>{serviceGig.basePrice} / </h1>
                        <h1>{serviceGig.priceType}</h1>
                    </div>
                </div>
            </div>
            <div id="card-body" className="grid gap-5 px-4 pb-4 mt-1">
                <header id="heading" className="grid">
                    <h1 className="text-lg md:text-xl">{serviceGig.title}</h1>
                </header>
                <div className='flex gap-3 items-center'>
                    {
                        getCategoryTag(serviceGig.category.name)
                    }
                    <p className='flex gap-0.5 items-center text-gray-600 text-sm'>
                        <DynamicIcon name='FiMapPin' className='w-4 h-4'/>
                        {serviceGig.serviceLocation}
                    </p>
                </div>

                {/* <p className="text-wrap text-sm">
                    {serviceGig.description.length > 100
                        ? serviceGig.description.substring(0, 100) + '...'
                        : serviceGig.description
                    }</p> */}

                <div className='flex items-center justify-between'>
                    <div className='flex gap-0.5 items-center text-sm'>
                        <DynamicIcon name='FaStar' className='w-4 h-4 text-amber-400'/>
                        <h1 className='text-sm text-black-95'>{averageRating}
                                <span className='text-gray-600'> ({totalReviews})</span>
                        </h1>
                    </div>
                    <div>
                        <h1 className="text-sm text-gray-600">{serviceGig.totalBookingCount} bookings</h1>
                    </div>
                </div>
                <div className="w-full text-blue-600 flex justify-between ">

                    <h1 className="text-sm text-gray-600">
                        {serviceGig.provider.userName}
                    </h1>

                    <Link href={`/service-gigs/details/${serviceGig.id}`}
                        className='flex space-x-2 justify-end items-center text-sm '>
                        View more
                        <DynamicIcon name="MdArrowRightAlt" className='text-lg top-px relative' />
                    </Link>
                </div>
                {
                    isEdit &&
                    <div className="flex gap-2  pt-3 border-t border-[#F3F4F6]">
                        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 
                            rounded-xl border border-[#EAECF0] text-[#6B7280] 
                            hover:border-[#3B6FE8] hover:text-[#3B6FE8] transition-colors
                            text-[12px] font-bold
                            ">
                            <DynamicIcon name='MdOutlineRemoveRedEye' className="w-3.5 h-3.5" /> 
                            Preview
                        </button>
                        <button
                        onClick={() => router.push("")}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl
                         bg-[#EEF3FF] text-[#3B6FE8] hover:bg-[#3B6FE8] hover:text-white 
                         transition-colors text-[12px] font-bold"
                        
                        >
                        <DynamicIcon name='MdOutlineModeEdit' className="w-3.5 h-3.5" /> Edit
                        </button>
                    </div>
                }
            </div>
        </div>
    );
}