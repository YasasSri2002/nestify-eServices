'use client'
import { Suspense } from "react";
import NavBar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import AllActiveGigsPage from "@/components/ui/service-gig/getActiveGigsPage";


export default function ServicesGigPage(){


    return(
            <>
            <NavBar/>
            <div className="my-5">
                <Suspense fallback={<p>loading....</p>}>
                    <AllActiveGigsPage/>
                </Suspense>
            </div>
            <Footer/>
            </>
    )
}