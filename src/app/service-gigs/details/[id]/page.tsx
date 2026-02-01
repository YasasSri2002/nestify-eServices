
import { getGigsById } from "@/app/api-calls/gig/by-id/route";

import NavBar from "@/components/ui/navbar";
import FullServiceGigsDetails from "@/components/ui/service-gig/fullServiceDetails";



import ServiceGigReviewSection from "@/components/ui/reviews/service-gig-review-section/serviceGigReviewSection";


 

export default async function ServiceGigDetails({params}:{readonly params:Promise<{id:string}> }){
    
    const gigId = (await params).id;
    const gig =  await getGigsById(gigId);
    


    return(

        <>
        <NavBar/>
        <FullServiceGigsDetails gig={gig} />
        <div className="my-5 ">
           <ServiceGigReviewSection serviceGigid={gigId} providersId={gig.provider.id} />
        </div>
        </>
        
    );
}