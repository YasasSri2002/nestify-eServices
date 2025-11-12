"use client";
import { getAllPosters } from "@/api-calls/gig-api";
import ServiceGigCard from "@/components/ui/service-gig/serviceGigCard";
import { ServiceGigWithProviderDto } from "@/dto/response/ServiceGigsWithProviderDto";
import { useEffect, useState } from "react";

export default function ServicesGigPage(){

    const[gigs,setGigs] = useState<ServiceGigWithProviderDto[]>([]);

    

    useEffect(()=>{
        async function fetchData(){
            try{
                const response = await getAllPosters();
                setGigs(response);
                console.log(response);
                
            }catch(err:any){
                console.log(err);
            }
        }
        fetchData();
    },[])


    return(
            <div>
                <div className="grid grid-cols-4">
                    {
                       gigs.map(gig => (
                            <div key={gig.id}>
                                <ServiceGigCard serviceGig={gig}/>
                            </div>
                       )) 
                    }
                </div>
            </div>
    )
}