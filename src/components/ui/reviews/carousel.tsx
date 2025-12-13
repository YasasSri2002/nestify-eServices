'use client';

import { useState,useEffect } from "react";

import { ReviewDto } from "@/dto/ReviewDto";
import ReviewCard from "./reviewCard";
import DynamicIcon from "@/components/utill/DynamicIcons";

export default function ReviewCarousel({reviewList}: {readonly reviewList:ReviewDto[]}){

   
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
  
  
  // Auto-play interval (3 seconds)
  const autoPlayInterval = 3000;

  useEffect(() => {
        if (!isAutoPlaying || isPaused) return;

        const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviewList.length);
        }, autoPlayInterval);

        return () => clearInterval(interval);
        
    }, [isAutoPlaying, isPaused, reviewList.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviewList.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviewList.length) % reviewList.length);
  };

  const goToSlide = (index:any) => {
    setCurrentIndex(index);
  };



    return(
         <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="relative" id="carousel-body">
            {/* Carousel Container */}
            <div 
                className="overflow-hidden rounded-xl"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
            <div 
                className="flex  transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {reviewList.map(review => (
                <div key={review.id} className="min-w-full">
                    <ReviewCard review={review} />
                </div>
                ))}
            </div>
            </div>

            {/* Navigation Buttons */}
            <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-10"
            aria-label="Previous review"
            >
            <DynamicIcon name="FaChevronLeft" className="w-6 h-6 text-gray-700" />
            </button>
            
            <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-10"
            aria-label="Next review"
            >
            <DynamicIcon name="FaChevronRight" className="w-6 h-6 text-gray-700" />
            </button>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-6">
            {reviewList.map((review, index) => (
                <button
                key={review.id}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-gray-300 w-2 hover:bg-gray-400'
                }`}
                aria-label={`Go to review ${index + 1}`}
                />
            ))}
            </div>
        </div>
    </div>
  );

}