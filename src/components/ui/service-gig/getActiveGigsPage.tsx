'use client'
import { useSearchParams } from "next/navigation";
import { useState,useEffect } from "react";

import { ServiceGigResponseDto } from "@/dto/response/ServiceGigResponseDto";
import { FullPageLoading } from "@/components/utill/loadingPage";
import { getActiveGigs } from "@/app/api-calls/gig/active-gigs/route";
import PaginationControls from "@/components/utill/paginationControls";
import ServiceGigCard from "./serviceGigCard";

export default function AllActiveGigsPage(){

     const[gigs,setGigs] = useState<ServiceGigResponseDto[]>([]);
    
        const[isLoading,setIsLoading] =useState(true);
        const[error,setError] = useState<string|null>(null);
    
        
    
        useEffect(()=>{
            async function fetchData(){
                try{
                    const response = await getActiveGigs();
                    setGigs(response);
                    setIsLoading(false)
                    
                }catch(err:any){
                    console.log(err);
                    setError(err?.message ?? 'Failed to load gigs. Please check your connection or try again later.');
                    setIsLoading(false);
                }
            }
            fetchData();
        },[])
    

        const searchParams = useSearchParams(); // Using client-side hook
        const page = searchParams.get('page') ?? '1';
        const per_page = searchParams.get('per_page') ?? '8';
          
        const start = (Number(page) - 1) * Number(per_page);
        const end = start + Number(per_page);
        const entries = gigs.slice(start, end);
    
        if(isLoading){
            return(
                 <FullPageLoading/>
            )
        }

        if(error){
            return(
                <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
                    <p className="text-red-500 text-lg font-semibold">Something went wrong</p>
                    <p className="text-gray-500 text-sm">{error}</p>
                </div>
            )
        }

    return(
         <div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 px-2 gap-8  sm:m-10">
                    {
                       entries.map(gig => (
                            <div key={gig.id}>
                                <ServiceGigCard serviceGig={gig}/>
                            </div>
                       )) 
                    }
                </div>
                <div className="grid justify-items-center">
                          <PaginationControls
                            hasNextPage={end < gigs.length}
                            hasPrevPage={start > 0}
                            endPage={gigs.length}
                            perPageNumber='8'
                            routerPath="service-gigs"
                          />
                </div>
            </div>
    )
}