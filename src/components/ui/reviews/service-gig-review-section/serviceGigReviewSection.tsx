'use client'
import { useEffect, useState } from "react";
import ReviewCarousel from "../carousel"
import { ReviewDto } from "@/dto/ReviewDto";
import { getReviewsByGigId } from "@/app/api-calls/reviews/route";
import ReviewForm from "../reviewForm";
import DynamicIcon from "@/components/utill/DynamicIcons";

export default function ServiceGigReviewSection({serviceGigid, providersId}:{serviceGigid:string, providersId: string}){
    
    const [reviewList, setReviewList] = useState<ReviewDto[]>([])
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        async function getData(gigId: string){
            try {
                setIsLoading(true);
                const response = await getReviewsByGigId(gigId);
                setReviewList(response);
                console.log("Fetched reviews:", response); // This will show the actual data
            } catch (error) {
                console.error("Error fetching reviews:", error);
            } finally {
                setIsLoading(false);
            }
        }
        getData(serviceGigid)
    }, [serviceGigid]) // Added dependency
    
    // This useEffect will log when reviewList changes
    useEffect(() => {
        console.log("Review list updated, length:", reviewList.length);
    }, [reviewList]);
    
    function handleReviewFormView(){
        document.getElementById('review-form')?.classList.toggle('hidden');
        setShowReviewForm(prev => !prev)
    }
    
    return(
        <>
            <h1 className="lg:text-2xl text-center">Reviews</h1>
            {isLoading ? (
                <p className="text-center text-2xl my-5">Loading reviews...</p>
            ) : reviewList.length === 0 ? (
                <p className="text-center text-2xl my-5">no reviews yet</p>
            ) : (
                <ReviewCarousel reviewList={reviewList}/>
            )}
            
            <div id="review-form" className="hidden ">
                <div className="absolute grid justify-items-center md:w-4xl 
                     top-75 sm:top-70 lg:top-50 z-50 lg:w-5xl xl:w-7xl">
                    <div className="flex justify-end w-dvw md:w-[65%] lg:w-[56%] xl:w-[40%] relative top-6 pr-5 pt-5">
                        <button onClick={handleReviewFormView}>
                            <DynamicIcon name="MdClose"></DynamicIcon>
                        </button>
                    </div>
                    <ReviewForm onClose={handleReviewFormView} gigId={serviceGigid} providersId={providersId}/>
                </div>
            </div>
            
            <div className="grid justify-end w-full pr-5">
                <button className="px-5 py-1 border active:scale-75 duration-100 delay-2"
                    onClick={handleReviewFormView}>
                    Add Review
                </button>  
            </div> 
        </>
    )
}