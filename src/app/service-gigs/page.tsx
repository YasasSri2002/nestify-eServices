'use client'
import { Suspense } from "react";
import NavBar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import AllActiveGigsPage from "@/components/ui/service-gig/getActiveGigsPage";
import { FullPageLoading } from "@/components/utill/loadingPage";


export default function ServicesGigPage(){


    return(
            <>
            <NavBar/>
            <Suspense fallback={<FullPageLoading />}>
                <AllActiveGigsPage/>
            </Suspense>
            <Footer/>
            </>
    )
}