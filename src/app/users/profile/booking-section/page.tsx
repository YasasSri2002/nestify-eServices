'use client'

import ProfileNavbar from "../profileNavbar";
import BookingCard from "./bookingCard";

export default function ProfileBookingSection(){
    return(
        <div>
            <ProfileNavbar/>
            <div className="grid bg-white/85 lg:m-10 rounded-2xl border border-gray-700">
                <h1>Booking History</h1>
                <h1>view and manage your bookings</h1>
                <div className="m-5 grid justify-items-center">
                     <BookingCard/>
                </div>
            </div>

        </div>
    )
}