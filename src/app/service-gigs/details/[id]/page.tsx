
import { getGigsById } from "@/app/api-calls/gig/route";
import { getReviewsByGigId } from "@/app/api-calls/reviews/route";
import NavBar from "@/components/ui/navbar";
import FullServiceGigsDetails from "@/components/ui/service-gig/fullServiceDetails";
import { ReviewDto } from "@/dto/ReviewDto";

import ReviewCarousel from "@/components/ui/reviews/carousel";


 

export default async  function ServiceGigDetails({params}:{readonly params:Promise<{id:string}> }){
    
    const gigId = (await params).id;
    const gig =  await getGigsById(gigId);
    const reviewList: ReviewDto[] = await getReviewsByGigId(gigId);


    return(

        <>
        <NavBar/>
        <FullServiceGigsDetails gig={gig} />
        <div>
            <h1 className="lg:text-2xl text-center">Reviews</h1>
            <ReviewCarousel reviewList={reviewList}/>

                
        </div>
        </>
        
    );
}