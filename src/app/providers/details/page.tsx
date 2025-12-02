'use client'
import { getProviderById } from "@/app/api-calls/provider/route";
import { ProviderWithAllDetails } from "@/dto/ProviderDto";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function ProviderDetailsPage(){
    const searchParam = useSearchParams();
    const providerIdParam = searchParam.get("providerId");
    const[provider,setProvider] = useState<ProviderWithAllDetails>();

    useEffect(()=>{
        async function fetchData(){
            if(providerIdParam){
                const data =  await getProviderById(providerIdParam);
                setProvider(data)
            }
        }
        fetchData();
    },[])

    return(
        <div>
            <div className="grid md:grid-cols-6 ">
                <div className="col-span-2 border-2 border-red-400 w-full  bg-gray-200">
                   <div className="flex space-x-5">
                        <h1>provider name:</h1>
                        <h1>{provider?.providerDto.userName}</h1>
                    </div>
                </div>
                <div className="col-span-4 border-2 border-blue-800">
                    <h1>this is his all services he providing</h1>
                </div>
            </div>
    
        </div>
    )
}