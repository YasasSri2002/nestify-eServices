
import DynamicIcon from "@/components/utill/DynamicIcons"
import { BookingResponseDto } from "@/dto/BookingDto"


export default function BookingCard({bookingData}:{bookingData:BookingResponseDto}){


    return(
        <div className="grid rounded-lg w-full bg-white/80 shadow-md p-5 grid-cols-9 xl:w-6xl">
            <div className="col-span-7 grid gap-3">
                <h1>{bookingData.serviceGigResponseDto.title}</h1>
                <h2 className="text-gray-300">with {bookingData.providerDto.firstName}</h2>
                <div className="flex gap-3">
                    <h1 className="flex gap-1"><DynamicIcon name="CiCalendar"/> {bookingData.startingDate}</h1>
                    <h1 className="flex gap-1"><DynamicIcon name="FaClock"/> {bookingData.startingTime}</h1>
                </div>
            </div>
            <div className="grid col-span-2 border border-red-600 ">
                <div className="flex justify-center">
                     <label htmlFor="">{bookingData.status}</label>
                </div>
                <div className="flex items-start justify-end">
                    <button> view details</button>
                </div>
            </div>


        </div>
    )
}