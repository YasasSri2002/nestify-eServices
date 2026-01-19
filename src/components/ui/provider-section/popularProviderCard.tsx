"use client"

import Image from 'next/image';
import Link from 'next/link';

import { ProviderWithCategory } from '@/dto/response/ProviderWithCategoryDto';

import {BadgeCheck ,Star, MapPin } from 'lucide-react';


export default function PopularProviderCard({ provider  }: { readonly provider: ProviderWithCategory }){
    
    return (
      <div className="transform-3d ">
        <div
          className="bg-white grid content-between  shadow-2xl w-[20em] sm:w-[25em] h-100 py-2 rounded-2xl
            hover:scale-105 hover:translate-1 pb-5 border-t border-gray-300"
        >
          <div className="flex space-x-5  items-center justify-center">
            <div className="flex justify-normal">
              <Image
                src={'/logo.png'}
                className="rounded-full border"
                width={100}
                height={100}
                alt=""
              />
            </div>
            <div className="space-y-1">
              <div className="flex space-x-4">
                <h1 className="capitalize">{provider.providerDto.userName}</h1>
                {provider.providerDto.isVerified ? <BadgeCheck stroke="green" />:""}
              </div>
              <h2 className="capitalize">{provider.providerDto.expertise}</h2>
              <div className="flex space-x-2 items-center">
                <Star fill="gold" stroke="gold" width={16} />
                <h2 className="font-bold text-[0.8em]">{provider.avgRate== null ? 0 : provider.avgRate }</h2>
                <h6 className="text-[0.8em] text-gray-600">({provider.reviews} views)</h6>
              </div>
            </div>
            
          </div>

          {
            provider.providerDto.address == null ? '' : 
            <div className="flex space-x-1 pl-5">
              <MapPin width={25} stroke="hsla(0,0%,61%,1)" strokeWidth={2.5} />
              <h2>{provider.providerDto.address}</h2>
            </div>
          }

          <div className="pl-5 my-5 space-y-2">
             <div className="space-y-3 grid mb-4">
                <h2>Other Services Categories</h2>
              <div className="flex  space-x-1 w-full flex-wrap space-y-3">
                {provider.categoriesSet.length == 0 ? <h1 className='h-10'> None </h1>:
                  provider.categoriesSet.map((category) => (
                    <h2
                      key={category.id}
                      className="bg-[hsla(0,1%,79%,1)] rounded-xl px-2 capitalize flex justify-center items-center py-1 h-10"
                    >
                      {category.name}
                    </h2>
                  ))
                  }
              </div>
            </div> 
            <div className="grid">
              <div className='flex  w-full '>
                <span>{provider.providerDto.experience === null ? '': 
                    provider.providerDto.experience + " of experience" } </span>
              </div>
            </div>
          </div>

          <div className="grid mx-4 content-end justify-items-center">
            <Link href={`providers/details/${provider.providerDto.id}`}
                 className='bg-white hover:bg-gray-200 border rounded-md w-2/3 h-8 flex justify-center'>
                <button>More Details</button>
            </Link>
          </div>
        </div>
      </div>
    );
}