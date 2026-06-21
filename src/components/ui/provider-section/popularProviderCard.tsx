"use client"

import Image from 'next/image';
import Link from 'next/link';

import { ProviderWithCategory } from '@/dto/response/ProviderWithCategoryDto';

import {BadgeCheck ,Star, MapPin } from 'lucide-react';


export default function PopularProviderCard({ provider  }: { readonly provider: ProviderWithCategory }){
    
    return (
      <div className="transform-3d ">
        <div
          className="bg-white grid content-between  shadow-[0_4px_12px_rgba(10,25,47,0.08)] w-[20em] sm:w-[25em] h-100 py-2 rounded-2xl
            hover:scale-105 hover:translate-1 hover:shadow-[0_12px_32px_rgba(10,25,47,0.12)] pb-5 border border-[#EAF2F1] transition-all duration-300"
        >
          <div className="flex space-x-5  items-center justify-center">
            <div className="flex justify-normal">
              <Image
                src={'/logo.png'}
                className="rounded-full border border-[#E2E8F0]"
                width={100}
                height={100}
                alt=""
              />
            </div>
            <div className="space-y-1">
              <div className="flex space-x-4">
                <h1 className="capitalize text-[#1E293B] font-medium">{provider.providerDto.userName}</h1>
                {provider.providerDto.isVerified ? <BadgeCheck stroke="#059669" />:""}
              </div>
              <h2 className="capitalize text-[#475569]">{provider.providerDto.expertise}</h2>
              <div className="flex space-x-2 items-center">
                <Star fill="#F59E0B" stroke="#F59E0B" width={16} />
                <h2 className="font-bold text-[0.8em] text-[#1E293B]">{provider.avgRate== null ? 0 : provider.avgRate }</h2>
                <h6 className="text-[0.8em] text-[#94A3B8]">({provider.reviews} views)</h6>
              </div>
            </div>
            
          </div>

          {
            provider.providerDto.address == null ? '' : 
            <div className="flex space-x-1 pl-5">
              <MapPin width={25} stroke="#94A3B8" strokeWidth={2.5} />
              <h2 className="text-[#475569]">{provider.providerDto.address}</h2>
            </div>
          }

          <div className="pl-5 my-5 space-y-2">
             <div className="space-y-3 grid mb-4">
                <h2 className="text-[#1E293B] font-medium">Other Services Categories</h2>
              <div className="flex  space-x-1 w-full flex-wrap space-y-3">
                {provider.categoriesSet.length == 0 ? <h1 className='h-10 text-[#94A3B8]'> None </h1>:
                  provider.categoriesSet.map((category) => (
                    <h2
                      key={category.id}
                      className="bg-[#DBEAFE] text-[#1D4ED8] rounded-xl px-2 capitalize flex justify-center items-center py-1 h-10 text-sm font-medium"
                    >
                      {category.name}
                    </h2>
                  ))
                  }
              </div>
            </div> 
            <div className="grid">
              <div className='flex  w-full '>
                <span className="text-[#475569]">{provider.providerDto.experience === null ? '': 
                    provider.providerDto.experience + " of experience" } </span>
              </div>
            </div>
          </div>

          <div className="grid mx-4 content-end justify-items-center">
            <Link href={`providers/details/${provider.providerDto.id}`}
                 className='bg-white hover:bg-[#DBEAFE] border border-[#1D4ED8] text-[#1D4ED8] rounded-md w-2/3 h-8 flex justify-center items-center font-medium transition-colors duration-200'>
                <button>More Details</button>
            </Link>
          </div>
        </div>
      </div>
    );
}