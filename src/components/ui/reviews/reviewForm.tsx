'use client'

import { useEffect, useState } from "react";

import DynamicIcon from "@/components/utill/DynamicIcons";
import { FormEvent } from "react"
import { ReviewRequestDto } from "@/dto/ReviewDto";
import { SendAReview } from "@/app/api-calls/reviews/add-review/route";

 

export default function ReviewForm({onClose,gigId}:{onClose:()=>void, gigId: string}){

    
    const [rating, setRating] = useState(0);
   
       function getRateValue(rate:any){
        setRating(rate)
        console.log(rate);
       }

       function submitForm(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        console.log(formData);

        const reviewRequestDto: ReviewRequestDto ={
            comment: String(formData.get("message")),
            rating: rating,
            serviceGigId: gigId
        }

       
            const response = SendAReview(reviewRequestDto);


            response.then(() => {
                        alert("Successfully done");
                    })
                    .catch((err: Error) => {
                        alert("Error: " + err.message);
                    });


       
        
        onClose();
    }
   
   
    return(
            <div className="grid gap-5 justify-items-center content-center w-dvw md:w-fit  bg-gray-200 px-5 py-10 rounded-2xl">
                
                <h1 className="md:text-2xl">Tell us how was your experience with Provider</h1>
                <form onSubmit={submitForm} className="grid content-center gap-4">
                    
                    <div className="flex space-x-5 justify-center">
                        {
                            [1,2,3,4,5].map((_,i)=>{
                             const starRate = i+1;
                                return(
                                <button  key={i} type="button" >
                                    <DynamicIcon 
                                     onClick={()=>getRateValue(i+1)} name="FaStar" 
                                     className={`text-sm lg:text-4xl 
                                                ${ starRate <= rating ? 'text-amber-400': 'text-gray-400'}`}
                                    />
                                </button>)
                                
                            })
                        }
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="message">Leave your thoughts</label>
                        <textarea name="message" id="client-message" 
                            className="w-60 sm:w-100 lg:w-120 h-30 sm:h-50 rounded-2xl px-2 pt-2 border focus:outline-0 resize-none bg-gray-100"></textarea>

                    </div>

                    <div className="flex justify-center items-center">
                        <button type="submit" 
                            className="rounded-xl bg-blue-600 px-5 py-1 text-white/85 hover:scale-105" >
                            Submit
                        </button>
                    </div>
                    
                </form>
                
            </div>
    )
}