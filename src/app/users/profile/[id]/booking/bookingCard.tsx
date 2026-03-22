'use client'
import { markBookingComplete } from "@/app/api-calls/booking/mark-complete/route"
import DynamicIcon from "@/components/utill/DynamicIcons"
import { BookingResponseDto } from "@/dto/BookingDto"
import { stat } from "fs";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";



export default function BookingCard({bookingData}:{bookingData:BookingResponseDto}){

    const[status,setStatus] = useState('');

    useEffect(()=>{
        setStatus(bookingData.status)
        
    },[bookingData,status])

    async function handleMarkAsComplete(){
        try{
            await markBookingComplete(bookingData.id);
            await Swal.fire({
                title: "Successful",
                icon: "success",
                text: `${bookingData.name} is marked completed`,
                timer: 3000,
            })
            setStatus("completed");

        }catch(err: unknown){
            if(err instanceof Error){
            await Swal.fire({
                title: `Error`,
                icon: "error",
                text: `${err.message}`,
                timer: 3000,
            })
        }
        }

    }


    function renderStatusTag(){
        switch(status){
            case("pending"):
                return <label className="border border-blue-700 bg-blue-200 rounded-md px-4 h-8 text-blue-800 flex items-center gap-2">
                    <DynamicIcon name="FaRegClock"/>
                    Upcoming
                    </label>
            case("completed"):
                return <label className="border border-green-700 bg-green-200 rounded-md px-4 h-8 text-green-700 flex items-center gap-2">
                    <DynamicIcon name="IoCheckmarkDoneOutline"/>
                    Completed
                    
                    </label>
            case("cancelled"):
                return <label className="border border-red-700 bg-red-200 rounded-md px-4 h-8 
                    text-red-700 flex items-center">
                    <DynamicIcon name="MdClose"/>
                    Cancelled
                    </label>
        }
    }

    return(
        <div className="grid rounded-lg w-full bg-gray-50 shadow-lg p-5 xl:p-8 sm:grid-cols-9 xl:w-6xl gap-4 md:gap-0">
            {/* leftside */}
            <div className="sm:col-span-5 grid gap-3">
                <div className="grid gap-2">
                    <h1 className="text-lg xl:text-2xl capitalize">{bookingData.serviceGigResponseDto.title}</h1>
                    <h2 className="text-gray-600 text-md xl:text-xl">with {bookingData.providerDto.firstName}</h2>
                </div>
                <div className="flex gap-5">
                    <h1 className="flex gap-2 items-center"><DynamicIcon name="CiCalendar"/> {bookingData.startingDate}</h1>
                    <h1 className="flex gap-2 items-center"><DynamicIcon name="FaRegClock"/> {bookingData.startingTime}</h1>
                </div>
            </div>
            {/* righside */}
            <div className="grid  sm:col-span-4 gap-3  ">
                <div className="flex justify-end gap-3 items-center">
                        {renderStatusTag()}
                </div>
                <div className="flex justify-end gap-3 flex-wrap">
                    <button className="px-2 md:px-4 md:py-1  text-green-500 border border-green-500 rounded-md flex items-center gap-2 
                        active:scale-75 active:bg-green-500 active:text-white "
                        onClick={handleMarkAsComplete}
                        title="Mark as complete"
                        >
                        <DynamicIcon name="IoCheckmarkDoneOutline"/>
                    </button>
                    <button className="px-2 md:px-4 md:py-1  text-blue-500 border border-blue-500 rounded-md flex items-center gap-2 
                        active:scale-75 active:bg-blue-500 active:text-white"
                        title="Reschedule"
                        >
                       <DynamicIcon name="FaRegClock"/>
                    </button>
                     <button className="px-2 md:px-4 md:py-1 border   text-red-500 rounded-md flex items-center gap-2 active:scale-75
                     active:bg-red-500 active:text-white"
                     title="Cancel"
                     >
                       <DynamicIcon name="MdClose"/>
                    </button>
                </div>
                <div className="flex items-start justify-end">
                    <button className="text-blue-500 flex items-center gap-2"> View details <DynamicIcon name="FaArrowRight"/></button>
                </div>
            </div>


        </div>
    )
}