'use client';

import { useEffect, useState } from "react";
import Image from "next/image";

import DynamicIcon from "@/components/utill/DynamicIcons";
import { ReviewDto } from "@/dto/ReviewDto";

export default function ReviewCard({review}: {readonly review: ReviewDto}){

    const [rating,setRating] = useState(0);  

    useEffect(()=>{
        setRating(review.rating);
    },[])

    return(
        
        <div className=" rounded-2xl  grid gap-3 w-full px-15 bg-gray-100 py-5 h-50">
            <div className="grid gap-2">
                <div className="flex items-center space-x-4 ">
                     <div className="w-10 h-10 rounded-full">
                        <Image src={"https://avatar.iran.liara.run/public/boy"} 
                                width={100}
                                height={100}
                                alt="provider's profile picture"/>
                    </div>
                     <h1>{review.reviewsClient.email}</h1>
                </div>

                <div className="flex space-x-5 items-center">
                   <div className="flex gap-1  items-center">
                        {[1,2,3,4,5].map((number, i) => (
                            <span key={number}>
                                <DynamicIcon name="FaStar" 
                                    className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}/>
                            </span>
                        ))}
                    </div>
                    <h1>{rating}</h1>
                </div>
            </div>

            <p>{review.comment}</p>

                
        </div>

    )
}