import ProfileNavbar from "@/app/users/profile/profileNavbar";
import { Suspense } from "react";
import { FullPageLoading } from "@/components/utill/loadingPage";
import { BookingResponseDto } from "@/dto/BookingDto";
import { getBookingDataByClientId } from "@/app/api-calls/booking/by-client-id/route";
import BookingCard from "../bookingCard";

export default async function ProfileBookingSection({ params }: { params: { id: string } }) {
    const { id } = await params;

    const bookingList: BookingResponseDto[] =  await getBookingDataByClientId(id);

    return (
        <div>
            <ProfileNavbar />
            {
                bookingList.map(entity=>(
                    <BookingCard bookingData={entity} />
                ))
            }
        </div>
    );
}
