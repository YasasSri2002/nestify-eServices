
import { getGigsById } from "@/app/api-calls/gig/by-id/route";

import NavBar from "@/components/ui/navbar";
import FullServiceGigsDetails from "@/components/ui/service-gig/fullServiceDetails";



import ServiceGigReviewSection from "@/components/ui/reviews/service-gig-review-section/serviceGigReviewSection";




export default async function ServiceGigDetails({ params }: { readonly params: Promise<{ id: string }> }) {

    const gigId = (await params).id;
    const gig = await getGigsById(gigId);

    return (

        <>
            <NavBar />
            <div className="bg-gradient-to-b from-[#d9edee] via-[#e6f3f3] to-[#ebf7f7]">
                <FullServiceGigsDetails gig={gig} />
                <div className="py-5 px-5">
                    <ServiceGigReviewSection serviceGigid={gigId} providersId={gig.provider.id} />
                </div>
            </div>
        </>

    );
}