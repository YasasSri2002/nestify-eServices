'use client';

import { useState } from 'react';
import {
  useCancelBooking,
  useCompleteBooking,
  useRescheduleBooking,
} from '@/hooks/queries/useBookings';
import { RescheduleForm } from '@/components/ui/booking/rescheduleForm';
import DynamicIcon from '@/components/utill/DynamicIcons';
import { BookingResponseDto } from '@/dto/BookingDto';
import { BookingStatus } from '@/types/booking';
import Swal from 'sweetalert2';

export default function BookingCard({
  bookingData,
}: {
  bookingData: BookingResponseDto;
}) {
  const [localStatus, setLocalStatus] = useState<BookingStatus>(
    bookingData.status as BookingStatus
  );
  const [showRescheduleForm, setShowRescheduleForm] = useState(false);

  const cancelMutation = useCancelBooking();
  const completeMutation = useCompleteBooking();
  const rescheduleMutation = useRescheduleBooking();

  async function handleMarkAsComplete() {
    const result = await Swal.fire({
      title: 'Completed?',
      text: 'Mark the booking as complete',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    });

    if (!result.isConfirmed) return;

    try {
      await completeMutation.mutateAsync(bookingData.id);
      setLocalStatus('completed');
      await Swal.fire({
        title: 'Successful',
        icon: 'success',
        text: `${bookingData.name} is marked completed`,
        timer: 3000,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Action failed.';
      await Swal.fire({
        title: 'Error',
        icon: 'error',
        text: msg,
        timer: 3000,
      });
    }
  }

  async function handleCancelBooking() {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Cancel the booking!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    });

    if (!result.isConfirmed) return;

    try {
      await cancelMutation.mutateAsync(bookingData.id);
      setLocalStatus('cancelled');
      await Swal.fire({
        title: 'Successful',
        icon: 'success',
        text: `${bookingData.name} is canceled`,
        timer: 3000,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Action failed.';
      await Swal.fire({
        title: 'Error',
        icon: 'error',
        text: msg,
        timer: 3000,
      });
    }
  }

  async function handleReschedule(rescheduleDate: string, rescheduleTime: string) {
    Swal.fire({
      title: 'Rescheduling…',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await rescheduleMutation.mutateAsync({
        taskId: bookingData.id,
        rescheduleDate,
        rescheduleTime,
      });
      setShowRescheduleForm(false);
      Swal.close();
      await Swal.fire({
        title: 'Rescheduled!',
        icon: 'success',
        text: 'Booking has been rescheduled successfully.',
      });
    } catch (err: unknown) {
      Swal.close();
      const msg = err instanceof Error ? err.message : 'Failed to reschedule.';
      await Swal.fire({
        title: 'Error',
        icon: 'error',
        text: msg,
      });
    }
  }

  function renderStatusTag() {
    switch (localStatus) {
      case 'pending':
        return (
          <label className="border border-blue-700 bg-blue-200 rounded-md px-4 h-8 text-blue-800 flex items-center gap-2">
            <DynamicIcon name="FaRegClock" />
            Upcoming
          </label>
        );
      case 'completed':
        return (
          <label className="border border-green-700 bg-green-200 rounded-md px-4 h-8 text-green-700 flex items-center gap-2">
            <DynamicIcon name="IoCheckmarkDoneOutline" />
            Completed
          </label>
        );
      case 'cancelled':
        return (
          <label className="border border-red-700 bg-red-200 rounded-md px-4 h-8 text-red-700 flex items-center gap-2">
            <DynamicIcon name="MdClose" />
            Cancelled
          </label>
        );
      default:
        return null;
    }
  }

  return (
    <main className="grid rounded-lg w-full bg-gray-50 shadow-lg p-5 xl:p-8 sm:grid-cols-9 xl:w-6xl gap-4 md:gap-0">
      {/* Left side */}
      <div className="sm:col-span-5 grid gap-3">
        <div className="grid gap-2">
          <h1 className="text-lg xl:text-2xl capitalize">
            {bookingData.serviceGigResponseDto?.title ?? 'Service'}
          </h1>
          <h2 className="text-gray-600 text-md xl:text-xl">
            with {bookingData.providerDto?.userName ?? 'Provider'}
          </h2>
        </div>
        <div className="flex gap-5">
          <h1 className="flex gap-2 items-center">
            <DynamicIcon name="CiCalendar" /> {bookingData.startingDate}
          </h1>
          <h1 className="flex gap-2 items-center">
            <DynamicIcon name="FaRegClock" /> {bookingData.startingTime}
          </h1>
        </div>
      </div>

      {/* Right side */}
      <div className="grid sm:col-span-4 gap-3">
        <div className="flex justify-end gap-3 items-center">
          {renderStatusTag()}
        </div>
        {localStatus !== 'completed' && localStatus !== 'cancelled' && (
          <div className="flex justify-end gap-3 flex-wrap">
            <button
              disabled={completeMutation.isPending}
              className="px-2 md:px-4 md:py-1 text-green-500 border border-green-500 rounded-md flex items-center gap-2 
                active:scale-75 active:bg-green-500 active:text-white disabled:opacity-50"
              onClick={handleMarkAsComplete}
              title="Mark as complete"
            >
              <DynamicIcon name="IoCheckmarkDoneOutline" />
            </button>
            <button
              className="px-2 md:px-4 md:py-1 text-blue-500 border border-blue-500 rounded-md flex items-center gap-2 
                active:scale-75 active:bg-blue-500 active:text-white"
              title="Reschedule"
              onClick={() => setShowRescheduleForm(true)}
            >
              <DynamicIcon name="FaRegClock" />
            </button>
            <button
              disabled={cancelMutation.isPending}
              className="px-2 md:px-4 md:py-1 border text-red-500 rounded-md flex items-center gap-2 active:scale-75
                active:bg-red-500 active:text-white disabled:opacity-50"
              title="Cancel"
              onClick={handleCancelBooking}
            >
              <DynamicIcon name="MdClose" />
            </button>
          </div>
        )}
        <div className="flex items-start justify-end">
          <button className="text-blue-500 flex items-center gap-2">
            View details <DynamicIcon name="FaArrowRight" />
          </button>
        </div>
      </div>

      {showRescheduleForm && (
        <RescheduleForm
          onSubmit={handleReschedule}
          onCancel={() => setShowRescheduleForm(false)}
        />
      )}
    </main>
  );
}