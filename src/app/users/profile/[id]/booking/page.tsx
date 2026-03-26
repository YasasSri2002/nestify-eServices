"use client"; 

import BookingCard from "./bookingCard";
import { getBookingDataByClientId } from "@/app/api-calls/booking/by-client-id/route";
import { LoadingPage } from "@/components/utill/loadingPage";
import PaginationControls from "@/components/utill/paginationControls";
import { BookingResponseDto } from "@/dto/BookingDto";
import { BookingStatus } from "@/types/booking";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";

export default  function BookingList() {
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const page = Number(searchParams.get('page')?? '1');
    const perPage = Number(searchParams.get('perPage')?? '5');
    const isFirstRenderRef =useRef(true);
    const searchParamsRef = useRef(searchParams);

    const [bookingList,setBookingList] =useState<BookingResponseDto[]>([]); 
    const[isLoading,setIsLoading] = useState(false);
    const[statusFilter,setStatusFilter] = useState<BookingStatus>('' as BookingStatus);

     const resetPage = useCallback(() => {
        if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false;
            return;
        }
    const params = new URLSearchParams(searchParamsRef.current.toString());
        params.set('page', '1');
        router.replace(`${pathname}?${params.toString()}`);
    }, [pathname, router]); // searchParams intentionally omitted — read via ref

  useEffect(() => {
        resetPage();
    }, [statusFilter, resetPage]);

    const filteredBookingList = useMemo(()=>{
        
        let resultData = [...bookingList];

        if(statusFilter){
            const matched =resultData.filter(bookingData => bookingData.status === statusFilter);
            const others = resultData.filter(bookinData => bookinData.status !== statusFilter);
            resultData = [...matched,...others];

        }

        return resultData;


    },[bookingList, statusFilter])

    const paginateBookings = useMemo(()=>{
        return filteredBookingList.slice((page - 1) * perPage, page * perPage);
    },[filteredBookingList,page,perPage])

    
    useEffect(()=>{
        async function getBookingList(){
            try{
                setIsLoading(true);
                const response = await getBookingDataByClientId();
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

            <div className="grid h-10 justify-items-end">
                <div>
                    <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value as BookingStatus)}
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
                routerPath={pathname.replace(/^\//,'')}
            />
           </div>
        </div>
    );
}
