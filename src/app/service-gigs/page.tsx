"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import ServiceGigCard from "@/components/ui/service-gig/serviceGigCard";
import { ServiceGigWithProviderDto } from "@/dto/response/ServiceGigsWithProviderDto";
import PaginationControls from "@/components/utill/paginationControls";
import { getActiveGigs } from "../api-calls/gig/route";
import NavBar from "@/components/ui/navbar";

export default function ServicesGigPage(){

    const[gigs,setGigs] = useState<ServiceGigWithProviderDto[]>([]);

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
             <div className="w-dvw h-dvh grid content-center justify-items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
             </div>
        )
    }

    return(
            <>
            <NavBar/>
        
            <div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 px-2 gap-8">
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

            </>
    )
}