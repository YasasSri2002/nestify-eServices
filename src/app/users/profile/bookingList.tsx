"use client"; // Optional if you use any client hooks — remove if pure server

import BookingCard from "./bookingCard";
import { getBookingDataByClientId } from "@/app/api-calls/booking/by-client-id/route";
import { LoadingPage } from "@/components/utill/loadingPage";
import PaginationControls from "@/components/utill/paginationControls";
import { BookingResponseDto } from "@/dto/BookingDto";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default  function BookingList({ id }: { id: string }) {

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const page = Number(searchParams.get('page')?? '1');
    const perPage = Number(searchParams.get('perPage')?? '10');

    const [bookingList,setBookingList] =useState<BookingResponseDto[]>([]); 
    const[isLoading,setIsLoading] = useState(false);

    const paginateBookings = useMemo(()=>{
        return bookingList.slice((page - 1) * perPage, page * perPage);
    },[bookingList])

    
    useEffect(()=>{
        async function getBookingList(){
            try{
                setIsLoading(true);
                const response = await getBookingDataByClientId(id);
                console.log(response);
                setBookingList(response)
            }catch(err:unknown){
                console.log("error from getbooking list user porfile-->",err)
            }finally{
                setIsLoading(false)
            }
        }
        getBookingList()
    },[])

    if(isLoading){
        return(
            <div className="lg:m-10 sm:m-5">
                <div>
                    <LoadingPage/>
                </div>
            </div>
        )
    }

    return (
        <div className="grid  bg-white/85 md:m-5 lg:m-10 rounded-2xl border border-gray-700 p-5">
            <header>
                <h1 className="text-2xl font-semibold">Booking History</h1>
                <p className="text-gray-600 mb-4">View and manage your bookings</p>
            </header>

            <div className="m-5 grid justify-items-center gap-4 max:h-4xl">
                {bookingList.length === 0 ? (
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
                routerPath={pathname.replace(/^\//,'')}
            />
           </div>
        </div>
    );
}
