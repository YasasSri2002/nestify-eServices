'use client';

import { useState } from 'react';
import ReviewCarousel from '../carousel';
import { useGigReviews } from '@/hooks/queries/useReviews';
import ReviewForm from '../reviewForm';
import DynamicIcon from '@/components/utill/DynamicIcons';

export default function ServiceGigReviewSection({
  serviceGigid,
  providersId,
}: {
  serviceGigid: string;
  providersId: string;
}) {
  const { data: reviewList = [], isLoading } = useGigReviews(serviceGigid);
  const [showReviewForm, setShowReviewForm] = useState(false);

  function handleReviewFormView() {
    document.getElementById('review-form')?.classList.toggle('hidden');
    setShowReviewForm((prev) => !prev);
  }

  return (
    <>
      <h1 className="lg:text-2xl text-black ml-7">Customer reviews</h1>
      {isLoading ? (
        <p className="text-center text-2xl my-5">Loading reviews…</p>
      ) : reviewList.length === 0 ? (
        <p className="text-center text-2xl my-5">No reviews yet</p>
      ) : (
        <ReviewCarousel reviewList={reviewList} />
      )}

      <div id="review-form" className="hidden ">
        <div className="absolute grid justify-items-center md:w-4xl top-75 sm:top-70 lg:top-50 z-50 lg:w-5xl xl:w-7xl">
          <div className="flex justify-end w-dvw md:w-[65%] lg:w-[56%] xl:w-[40%] relative top-6 pr-5 pt-5">
            <button onClick={handleReviewFormView}>
              <DynamicIcon name="MdClose" />
            </button>
          </div>
          <ReviewForm
            onClose={handleReviewFormView}
            gigId={serviceGigid}
            providersId={providersId}
          />
        </div>
      </div>

      <div className="grid justify-end w-full pr-5">
        <button
          className="px-4 border-accent-400 border-2 bg-surface-ice-100 text-accent-600 hover:bg-accent-500
            hover:text-white active:bg-accent-500 active:scale-95 rounded-md py-2 duration-100"
          onClick={handleReviewFormView}
        >
          Add Review
        </button>
      </div>
    </>
  );
}