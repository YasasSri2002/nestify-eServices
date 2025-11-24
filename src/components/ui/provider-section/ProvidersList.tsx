"use client";
import { useEffect, useState } from "react";

import ProviderCard from "@/components/ui/provider-section/providerCard";


import { ProviderWithCategory } from "@/dto/response/ProviderWithCategoryDto";
import { getPopularProviders } from "@/app/api-calls/provider/route";


const images =[
  "https://avatar.iran.liara.run/public/girl",
  "https://avatar.iran.liara.run/public/boy",
  "https://avatar.iran.liara.run/public/boy?username=Scott",
  "https://avatar.iran.liara.run/public/boy?username=Maria",
  "https://avatar.iran.liara.run/username?username=nayanja+nipunsara",
  "https://avatar.iran.liara.run/username?username=[firstname+lastname]",
  "https://avatar.iran.liara.run/username?username=[firstname+lastname]",
  "https://avatar.iran.liara.run/username?username=[firstname+lastname]"
]

export default function ProvidersList() {
  const [providers, setProviders] = useState<ProviderWithCategory[]>([]);

  useEffect(()=>{
      async function fetchPopularProivders(){
        try{
          const data = await getPopularProviders();
          setProviders(data);
            
        }catch(err:any){
            alert("error"+err);
        }
      }
      fetchPopularProivders();
  
    },[])

  return (
    <div className="h-full">
      <h1 className="text-gray-900 text-4xl lg:text-6xl text-center my-10">
        Popular Providers
      </h1>

      <div className="flex flex-row flex-wrap justify-center gap-5">
        {providers.map((provider,index) => (
          <ProviderCard key={provider.providerDto.email} provider={provider}  images={images[index % images.length]}/>
        ))}
      </div>
    </div>
  );
}
