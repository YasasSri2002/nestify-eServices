'use client';

import { useEffect, useState } from "react";

import { getCountOfActiveGigs } from "@/app/api-calls/gig/route";
import OverviewCard from "./overviewCards";


export default function AdminOverview(){

    const[gigCount,setGigCount] =useState("");

 
useEffect(() => {
    const fetchCount = async () => {
        const response = await getCountOfActiveGigs();
        const responseData = response["Count of active gigs"];
        setGigCount(responseData);
        console.log(gigCount); // "12"
    };
    fetchCount();
}, []);


    return(
        <div className="grid md:grid-cols-2 justify-items-center w-full mt-5 gap-5">
            <div className="md:col-1 w-full px-5 gap-5 grid">
                <OverviewCard title="provider count" data="5" iconName="GoPeople" iconColor="#00C8FF"/>
                <OverviewCard title="Active Service Gigs Count" data={gigCount} iconName="GoPeople" iconColor="#00C8FF"/>
            </div>
            <div className="md:col-2 w-full px-5">
               <OverviewCard title="user count" data="15" iconName="GoPeople" iconColor="#00C8FF"/>
            </div>
        </div>
    );
}