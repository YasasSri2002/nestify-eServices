"use client"

import DynamicIcon from '@/components/utill/DynamicIcons';

import {BadgeCheck ,Star, MapPin } from 'lucide-react';

import { ProviderWithCategory } from '@/dto/response/ProviderWithCategoryDto';


export default function ProviderCard({ provider ,images }: { readonly provider: ProviderWithCategory , readonly images: string }){
    
    return (
      <div className="[transform-style:preserve-3d] ">
        <div
          className="bg-white  shadow-2xl w-[20em] h-80 py-2 rounded-2xl
            hover:scale-105 hover:translate-1"
        >
          <div className="flex space-x-5 py-6 items-center justify-center">
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
                <BadgeCheck stroke="green" />
              </div>
              <h2 className="capitalize">{provider.providerDto.expertise}</h2>
              <div className="flex space-x-2 items-center">
                <Star fill="gold" stroke="gold" width={16} />
                <h2 className="font-bold text-[0.8em]">4.9</h2>
                <h6 className="text-[0.8em] text-gray-600">(127 views)</h6>
              </div>
            </div>
          </div>

          <div className="px-3 space-y-4">
            <div className="flex space-x-3">
              <MapPin width={25} stroke="hsla(0,0%,61%,1)" strokeWidth={2.5} />
              <h2>{provider.providerDto.address}</h2>
            </div>
             <div className="space-y-3 flex space-x-4">
              <h2>Services Categories:</h2>
              <div className="flex justify-end space-x-3 flex-wrap space-y-3">
                {provider.categoriesSet.map((category) => (
                  <h2
                    key={category.id}
                    className="bg-[hsla(0,1%,79%,1)] rounded-xl px-2 capitalize flex justify-center items-center  py-1"
                  >
                    {category.name}
                  </h2>
                ))}
              </div>
            </div> 
            <div className="flex justify-between">
              <div>
                <span>{provider.providerDto.experience}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 mt-5 mx-4 space-x-5 content-end">
            <div className="col-1 bg-white hover:bg-gray-200 border-1 rounded-2xl">
              <div className="flex justify-center items-center pt-1">
                <button>Book</button>
              </div>
            </div>
            <div className="col-2  rounded-2xl bg-black/80 hover:bg-white/90 text-amber-50 hover:text-black/80 px-2 py-1 hover:border-1 hover:boder-black/80">
              <div className='flex justify-center items-center space-x-2'>
                <button>
                  Contact 
                </button>
                 <DynamicIcon name="FaPhone" className="text-[14px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}