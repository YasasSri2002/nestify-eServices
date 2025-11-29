'use client'
import { getProviderById } from "@/app/api-calls/provider/route";
import { ProviderDto } from "@/dto/ProviderDto";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function ProviderDetailsPage(){
    const searchParam = useSearchParams();
    const providerIdParam = searchParam.get("providerId");
    const[provider,setProvider] = useState<ProviderDto>();

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
                   <h1>provider name: {provider?.userName}</h1>
                </div>
                <div className="col-span-4 border-2 border-blue-800">
                    <h1>this is his all services he providing</h1>
                </div>
            </div>
    
        </div>
    )
}