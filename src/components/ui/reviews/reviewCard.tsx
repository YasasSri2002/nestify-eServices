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
        
        <div className="p-5 rounded-2xl bg-gray-200 lg:w-150 grid gap-3">
            <div className="grid gap-2">
                <h1>Rating</h1>
                <div className="flex space-x-5 items-center">
                    <div className="flex space-x-4">
                        <DynamicIcon name="IoIosStar" 
                            className={rating > 0 && rating < 6 ? `text-amber-300`: 'text-gray-500'}  />
                        <DynamicIcon name="IoIosStar" 
                            className={ rating > 1 && rating < 6 ? `text-amber-300`: 'text-gray-500'} />
                        <DynamicIcon name="IoIosStar" 
                            className={ rating > 2 && rating < 6 ? `text-amber-300`: 'text-gray-500'} />
                        <DynamicIcon name="IoIosStar" 
                            className={rating > 3 && rating < 6 ? `text-amber-300`: 'text-gray-500'} />
                        <DynamicIcon name="IoIosStar" 
                            className={rating == 5 ? `text-amber-300`: 'text-gray-500'} />
                    </div>
                    <h1>{rating}</h1>
                </div>
            </div>

            <p>{review.comment}</p>

                <div className="flex items-center space-x-4 justify-end">
                     <div className="w-10 h-10 rounded-full">
                        <Image src={"https://avatar.iran.liara.run/public/boy"} 
                                width={100}
                                height={100}
                                alt="provider's profile picture"/>
                    </div>
                     <h1>{review.reviewsClient.email}</h1>
                </div>

        </div>

    )
}