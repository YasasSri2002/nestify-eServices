"use client"; // Optional if you use any client hooks — remove if pure server

import BookingCard from "./bookingCard";
import { getBookingDataByClientId } from "@/app/api-calls/booking/by-client-id/route";
import { BookingResponseDto } from "@/dto/BookingDto";

export default async function BookingList({ id }: { id: string }) {
    const bookingList: BookingResponseDto[] = await getBookingDataByClientId(id);

    return (
        <div className="grid bg-white/85 lg:m-10 rounded-2xl border border-gray-700">
            <h1 className="text-2xl font-semibold">Booking History</h1>
            <p className="text-gray-600 mb-4">View and manage your bookings</p>

            <div className="m-5 grid justify-items-center gap-4">
                {bookingList.length === 0 ? (
                    <p>No bookings found.</p>
                ) : (
                    bookingList.map((entity) => (
                        <BookingCard key={entity.id} bookingData={entity} />
                    ))
                )}
            </div>
        </div>
    );
}
