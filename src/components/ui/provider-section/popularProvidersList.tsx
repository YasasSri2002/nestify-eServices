"use client";
import { useEffect, useState } from "react";

import PopularProviderCard from "@/components/ui/provider-section/popularProviderCard";
import { ProviderWithCategory } from "@/dto/response/ProviderWithCategoryDto";
import { getPopularProviders } from "@/app/api-calls/provider/route";
import {LoadingPage} from "@/components/utill/loadingPage";


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

export default function PopularProvidersList() {
  const [providers, setProviders] = useState<ProviderWithCategory[]>([]);
  const[isLoading,setIsLoading]= useState(true);

  useEffect(()=>{
      async function fetchPopularProivders(){
        try{
          const data = await getPopularProviders();
          setProviders(data);
          setIsLoading(false);
            
        }catch(err:any){
            alert("error"+err);
        }
      }
      fetchPopularProivders();
  
    },[])

    if(isLoading){
       return (
            <> 
              <h1 className="text-gray-900 text-4xl lg:text-6xl text-center my-10">
                Popular Providers
              </h1>
              <LoadingPage/>
            </>
      )
    }
  return (
    <div className="h-full">
      <h1 className="text-gray-900 text-4xl lg:text-6xl text-center my-10">
        Popular Providers
      </h1>

      <div className="flex flex-row flex-wrap justify-center gap-5 my-10">
        {providers.map((provider,index) => (
          <PopularProviderCard key={provider.providerDto.email} provider={provider}  images={images[index % images.length]}/>
        ))}
      </div>
    </div>
  );
}
