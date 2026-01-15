'use client'
import { Suspense } from "react";
import NavBar from "@/components/ui/navbar";

import AllActiveGigsPage from "@/components/ui/service-gig/getActiveGigsPage";


export default function ServicesGigPage(){


    return(
            <>
            <NavBar/>
            <Suspense fallback={<p>loading....</p>}>
                <AllActiveGigsPage/>
            </Suspense>
            
            </>
    )
}