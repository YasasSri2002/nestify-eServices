'use client';

import { useState, FormEvent } from 'react';
import DynamicIcon from '@/components/utill/DynamicIcons';
import { useAddReview } from '@/hooks/queries/useReviews';
import Swal from 'sweetalert2';

export default function ReviewForm({
  onClose,
  gigId,
  providersId,
}: {
  onClose: () => void;
  gigId: string;
  providersId: string;
}) {
  const [rating, setRating] = useState(0);
  const addReviewMutation = useAddReview(gigId);

  function getRateValue(rate: number) {
    setRating(rate);
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (rating === 0) {
      await Swal.fire({
        title: 'Rating Required',
        text: 'Please select a star rating before submitting.',
        icon: 'warning',
      });
      return;
    }

    const formData = new FormData(event.currentTarget);
    const comment = String(formData.get('message') || '').trim();

    try {
      await addReviewMutation.mutateAsync({
        comment,
        rating,
        serviceGigId: gigId,
        providerId: providersId,
      });

      await Swal.fire({
        title: 'Thank You!',
        text: 'Your review has been submitted successfully.',
        icon: 'success',
        timer: 2500,
        showConfirmButton: false,
      });

      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to submit review.';
      await Swal.fire({
        title: 'Error',
        text: msg,
        icon: 'error',
      });
    }
  }

  return (
    <div
      className="flex justify-center items-center inset-0 z-50 fixed w-full bg-black/40 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="grid gap-5 justify-items-center content-center w-dvw max-w-2xl bg-surface-snow p-6 
          rounded-2xl max-h-[95vh] mx-4 sm:mx-0 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex justify-end w-full">
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700">
            <DynamicIcon name="IoClose" className="w-6 h-6" />
          </button>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-primary-900 text-center">
          Tell us about your experience
        </h1>

        <form onSubmit={submitForm} className="grid content-center gap-5 w-full">
          <div className="flex space-x-3 sm:space-x-5 justify-center">
            {[1, 2, 3, 4, 5].map((_, i) => {
              const starRate = i + 1;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => getRateValue(starRate)}
                  className="transition-transform hover:scale-110 active:scale-95"
                >
                  <DynamicIcon
                    name="FaStar"
                    className={`text-2xl sm:text-4xl transition-colors ${
                      starRate <= rating ? 'text-amber-400' : 'text-neutral-300'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="grid gap-2">
            <label htmlFor="client-message" className="text-sm font-medium text-neutral-700">
              Leave your thoughts
            </label>
            <textarea
              name="message"
              id="client-message"
              required
              placeholder="Share details of your experience with this service provider…"
              className="w-full h-32 rounded-xl p-3 border border-neutral-200 focus:border-accent-500 focus:outline-none resize-none text-neutral-800"
            />
          </div>

          <div className="flex justify-center items-center w-full">
            <button
              type="submit"
              disabled={addReviewMutation.isPending}
              className="rounded-xl bg-accent-600 hover:bg-accent-700 px-5 py-3 text-white font-medium
                w-full active:scale-98 shadow-md transition-all disabled:opacity-50"
            >
              {addReviewMutation.isPending ? 'Submitting…' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}