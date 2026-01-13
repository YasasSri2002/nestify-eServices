'use client';

import { useEffect, useState } from "react";

import { getCountOfActiveGigs } from "@/app/api-calls/gig/count-of-active-gigs/route";
import OverviewCard from "./overviewCards";
import { getCountOfProviders } from "@/app/api-calls/provider/count/route";




export default function AdminOverview(){

    const[gigCount,setGigCount] =useState("");
    const[providerCount,setProviderCount] =useState("");

 
useEffect(() => {
    const fetchData = async () => {
        try {
            // First fetch
            const gigsResponse = await getCountOfActiveGigs();
            setGigCount(gigsResponse["Count of active gigs"]);
            console.log('Gigs:', gigsResponse["Count of active gigs"]);

            // Then fetch providers
            const providerCount = await getCountOfProviders();   
            console.log(providerCount);
            setProviderCount(providerCount["Provider count"]);

        } catch (err) {
            console.error('API fetch error:', err);
        }
    };

    fetchData();
}, []);


    return(
        <div className="grid md:grid-cols-2 justify-items-center w-full mt-5 gap-5">
            <div className="md:col-1 w-full px-5 gap-5 grid">
                <OverviewCard title="provider count" data={providerCount} iconName="GoPeople" 
                iconColor="text-black/90"/>
                
            </div>
            <div className="md:col-2 w-full px-5">
               <OverviewCard title="Active Service Gigs Count" data={gigCount} iconName="PiClockClockwiseFill" iconColor="text-green-500"/>
            </div>
        </div>
    );
}