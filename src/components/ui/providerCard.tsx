"use client"
import {BadgeCheck ,Star, MapPin ,Phone} from 'lucide-react'
import { useRef } from 'react';
import { ProviderDto } from '@/dto/ProviderDto';

export default function ProviderCard({ provider }: { provider: ProviderDto }){
    
    return(
        
        <>
            <div className='[transform-style:preserve-3d] '>
                <div className="bg-white  shadow-2xl w-[20em] h-90 py-2 rounded-2xl
            hover:[transform:scale3d(1,1.1,2)]"> 
                <div className="flex space-x-5 py-6 items-center justify-center">
                    <div>
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" className="rounded-full" width={50} height={50}  alt="" />
                    </div>
                    <div className='space-y-1' >
                        <div className='flex space-x-4'>
                            <h1>{provider.email}</h1>
                            <BadgeCheck stroke='green' />
                        </div>
                        <h2>{provider.expertise}</h2>
                        <div className='flex space-x-2 items-center'>
                            <Star fill='gold' stroke='gold' width={16}/>
                            <h2 className='font-bold text-[0.8em]'>4.9</h2>
                            <h6 className='text-[0.8em] text-gray-600'>(127 views)</h6>
                        </div>
                    </div>
                </div>
                
                <div className='px-3 space-y-4' >
                    <div className='flex space-x-3'>
                        <MapPin width={25} stroke='hsla(0,0%,61%,1)' strokeWidth={2.5}/>
                        <h2>New York, America</h2>
                    </div>
                    <div className='space-y-3 flex'> 
                        <h2>Services:</h2>
                        <div className='flex justify-end space-x-3 flex-wrap space-y-3'>
                            <h2 className='bg-[hsla(0,1%,79%,1)] rounded-2xl px-2'>Wiring</h2>
                            <h2 className='bg-[hsla(0,1%,79%,1)] rounded-2xl px-2'>Light Installation</h2>
                            <h2 className='bg-[hsla(0,1%,79%,1)] rounded-2xl px-2'>Electrical Repairs</h2>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex space-x-2'>
                            <h1>Starting at:</h1>
                            <span>$ {provider.hourlyRate}/hr</span>
                        </div>
                        <div>
                            <span>5+ years</span>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-2 mt-5 mx-4 space-x-5'>
                    <div className="col-1 bg-white hover:bg-gray-200 border-1 rounded-2xl">
                        <div className="flex justify-center items-center pt-1">
                            <button>Book</button>
                        </div>
                    </div>
                    <div className="col-2 bg-[hsla(240,81%,8%,1)] hover:bg-[hsla(240,81%,45%,1)] rounded-2xl text-amber-50 px-2 py-1">
                        <div className='flex justify-center space-x-3'>
                            <button>Contact </button>
                            <Phone width={24}  fill='white' stroke='white' strokeWidth={1}/> 
                        </div>
                        
                            
                    </div>
                </div>

            </div>
            </div>
        </>
    );
}