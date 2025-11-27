"use client"

import {BadgeCheck ,Star, MapPin } from 'lucide-react';

import { ProviderWithCategory } from '@/dto/response/ProviderWithCategoryDto';


export default function PopularProviderCard({ provider ,images }: { readonly provider: ProviderWithCategory , readonly images: string }){
    
    return (
      <div className="[transform-style:preserve-3d] ">
        <div
          className="bg-white grid content-between  shadow-2xl w-[20em] sm:w-[25em] h-100 py-2 rounded-2xl
            hover:scale-105 hover:translate-1 pb-5 border-t-1 border-gray-300 "
        >
          <div className="flex space-x-5  items-center justify-center">
            <div className="flex justify-normal">
              <img
                src={images}
                className="rounded-full"
                width={50}
                height={50}
                alt=""
              />
            </div>
            <div className="space-y-1 ml-5">
              <div className="flex space-x-4">
                <h1 className="capitalize">{provider.providerDto.userName}</h1>
                {provider.providerDto.isVerified ? <BadgeCheck stroke="green" />:""}
              </div>
              <h2 className="capitalize">{provider.providerDto.expertise}</h2>
              <div className="flex space-x-2 items-center">
                <Star fill="gold" stroke="gold" width={16} />
                <h2 className="font-bold text-[0.8em]">4.9</h2>
                <h6 className="text-[0.8em] text-gray-600">(127 views)</h6>
              </div>
            </div>
            
          </div>

          <div className="flex space-x-3">
              <MapPin width={25} stroke="hsla(0,0%,61%,1)" strokeWidth={2.5} />
              <h2>{provider.providerDto.address}</h2>
            </div>

          <div className="px-3 space-y-4">
            
             <div className="space-y-3 grid grid-cols-2">
              <div className='col-1'>
                <h2>Services Categories:</h2>
              </div>
              <div className="col-2 flex justify-end space-x-1 w-full flex-wrap space-y-3">
                {provider.categoriesSet.map((category) => (
                  <h2
                    key={category.id}
                    className="bg-[hsla(0,1%,79%,1)] rounded-xl px-2 capitalize flex justify-center items-center py-1 h-10"
                  >
                    {category.name}
                  </h2>
                ))}
              </div>
            </div> 
            <div className="flex justify-between">
              <h1>Experince: </h1>
              <div className='flex justify-center w-full pl-8'>
                <span>{provider.providerDto.experience}</span>
              </div>
            </div>
          </div>

          <div className="grid mx-4 content-end justify-items-center">
            <button className='bg-white hover:bg-gray-200 border-1 rounded-2xl w-2/3'>View</button>
          </div>
        </div>
      </div>
    );
}