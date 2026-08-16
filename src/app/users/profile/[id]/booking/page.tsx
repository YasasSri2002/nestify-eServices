"use client";

import BookingCard from "./bookingCard";
import { useClientBookings } from "@/hooks/queries/useBookings";
import { LoadingPage } from "@/components/utill/loadingPage";
import PaginationControls from "@/components/utill/paginationControls";
import { BookingStatus } from "@/types/booking";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useRef, useState, useCallback, useEffect } from "react";

export default function BookingList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = Number(searchParams.get('page') ?? '1');
  const perPage = Number(searchParams.get('perPage') ?? '5');
  const isFirstRenderRef = useRef(true);
  const searchParamsRef = useRef(searchParams);

  const { data: bookingList = [], isLoading } = useClientBookings();
  const [statusFilter, setStatusFilter] = useState<BookingStatus>('' as BookingStatus);

  const resetPage = useCallback(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }
    const params = new URLSearchParams(searchParamsRef.current.toString());
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
  }, [pathname, router]);

  useEffect(() => {
    resetPage();
  }, [statusFilter, resetPage]);

  const filteredBookingList = useMemo(() => {
    let resultData = [...bookingList];

    if (statusFilter) {
      const matched = resultData.filter((b) => b.status === statusFilter);
      const others = resultData.filter((b) => b.status !== statusFilter);
      resultData = [...matched, ...others];
    }

    return resultData;
  }, [bookingList, statusFilter]);

  const paginateBookings = useMemo(() => {
    return filteredBookingList.slice((page - 1) * perPage, page * perPage);
  }, [filteredBookingList, page, perPage]);

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
            onChange={(e) => setStatusFilter(e.target.value as BookingStatus)}
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
        {filteredBookingList.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          paginateBookings.map((entity) => (
            <BookingCard key={entity.id} bookingData={entity} />
          ))
        )}
      </div>
      <div className="flex justify-center">
        <PaginationControls
          hasNextPage={page * perPage < bookingList.length}
          hasPrevPage={page > 1}
          endPage={bookingList.length}
          perPageNumber={String(perPage)}
          routerPath={pathname.replace(/^\//, '')}
        />
      </div>
    </div>
  );
}
