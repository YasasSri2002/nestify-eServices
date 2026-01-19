"use client";
import { useEffect, useState } from "react";

import PopularProviderCard from "@/components/ui/provider-section/popularProviderCard";
import { ProviderWithCategory } from "@/dto/response/ProviderWithCategoryDto";
import getPopularProviders from "@/app/api-calls/provider/popular-providers/route";
import {LoadingPage} from "@/components/utill/loadingPage";



export default function PopularProvidersList() {
  const [providers, setProviders] = useState<ProviderWithCategory[]>([]);
  const[isLoading,setIsLoading]= useState(true);

  useEffect(()=>{
      async function fetchPopularProivders(){
        try{
          const data = await getPopularProviders();
          setProviders(data);
          setIsLoading(false);
            
        }catch(err:unknown){
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
        {providers.map((provider) => (
          <PopularProviderCard key={provider.providerDto.email} 
              provider={provider}/>
        ))}
      </div>
    </div>
  );
}
