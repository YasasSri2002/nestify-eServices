"use client";

import BookingCard from "./bookingCard";
import { useClientBookings } from "@/hooks/queries/useBookings";
import { LoadingPage } from "@/components/utill/loadingPage";
import PaginationControls from "@/components/utill/paginationControls";
import { BookingStatus } from "@/types/booking";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { BookingResponseDto } from "@/dto/BookingDto";

export default function BookingList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = Number(searchParams.get('page') ?? '1');
  const pageIndex = Math.max(0, page - 1);
  const pageSize = 10;

  const [statusFilter, setStatusFilter] = useState<BookingStatus>('' as BookingStatus);

  const { data: rawBookingData, isLoading } = useClientBookings(pageIndex, pageSize);

  // Directly consume backend pagination response
  const isPaginated = !Array.isArray(rawBookingData) && rawBookingData?.content !== undefined;
  const rawList: BookingResponseDto[] = isPaginated
    ? rawBookingData.content
    : (Array.isArray(rawBookingData) ? rawBookingData : []);

  const totalElements: number = isPaginated
    ? rawBookingData.totalElements
    : rawList.length;

  const totalPages: number = isPaginated
    ? rawBookingData.totalPages
    : Math.ceil(rawList.length / pageSize);

  const isLastPage: boolean = isPaginated
    ? rawBookingData.isLastPage
    : page >= totalPages;

  // Filter if status filter is selected
  const bookingList = statusFilter
    ? rawList.filter((b) => b.status === statusFilter)
    : rawList;

  function handleStatusChange(status: BookingStatus) {
    setStatusFilter(status);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
  }

  if (isLoading) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center h-screen">
          <LoadingPage />
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:p-5 lg:p-10 rounded-2xl p-5 min-h-[80vh]">
      <header>
        <h1 className="text-2xl font-semibold">Booking History</h1>
        <p className="text-gray-600 mb-4">View and manage your bookings</p>
      </header>

      <div className="grid h-10 justify-items-end">
        <div>
          <select
            value={statusFilter}
            onChange={(e) => handleStatusChange(e.target.value as BookingStatus)}
            className="shadow-md rounded p-2"
          >
            <option value="">All Status</option>
            <option value="pending">Upcoming</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="m-5 grid justify-items-center gap-4 max:h-4xl">
        {bookingList.length === 0 ? (
          <p className="text-neutral-500 py-10">No bookings found.</p>
        ) : (
          bookingList.map((entity) => (
            <BookingCard key={entity.id} bookingData={entity} />
          ))
        )}
      </div>

      {totalElements > 0 && (
        <div className="flex justify-center my-6">
          <PaginationControls
            hasNextPage={!isLastPage && page < totalPages}
            hasPrevPage={page > 1}
            endPage={totalElements}
            perPageNumber={String(pageSize)}
            routerPath={pathname.replace(/^\//, '')}
          />
        </div>
      )}
    </div>
  );
}
