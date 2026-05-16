'use client'
import { useSearchParams } from "next/navigation";
import { useState,useEffect } from "react";

import { ServiceGigResponseDto } from "@/dto/response/ServiceGigResponseDto";
import { FullPageLoading } from "@/components/utill/loadingPage";
import { getActiveGigs } from "@/app/api-calls/gig/active-gigs/route";
import PaginationControls from "@/components/utill/paginationControls";
import ServiceGigCard from "@/components/ui/service-gig/serviceGigCard";

export default function ProviderGigsPage(){

     const[gigs,setGigs] = useState<ServiceGigResponseDto[]>([]);
    
        const[isLoading,setIsLoading] =useState(true);
    
        
    
        useEffect(()=>{
            async function fetchData(){
                try{
                    const response = await getActiveGigs();
                    setGigs(response);
                    setIsLoading(false)
                    
                }catch(err:any){
                    console.log(err);
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

    return(
         <div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-5 my-10 lg:m-5">
                    {
                       entries.map(gig => (
                            <div key={gig.id}>
                                <ServiceGigCard serviceGig={gig} isEdit={true} />
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