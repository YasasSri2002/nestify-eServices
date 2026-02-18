
import DynamicIcon from "@/components/utill/DynamicIcons"
import { BookingResponseDto } from "@/dto/BookingDto"


export default function BookingCard({bookingData}:{bookingData:BookingResponseDto}){


    function renderStatusTag(){
        switch(bookingData.status){
            case("pending"):
                return <label className="border border-blue-700 bg-blue-200 rounded-md px-4 h-8 text-blue-800 flex items-center gap-2">
                    Upcoming
                    <DynamicIcon name="FaRegClock"/>
                    </label>
            case("compeleted"):
                return <label className="border border-green-700 bg-green-200 rounded-md px-4 h-8 text-green-700 flex items-center gap-2">
                    Completed
                    <DynamicIcon name="IoCheckmarkDoneOutline"/>
                    </label>
            case("cancelled"):
                return <label className="border border-red-700 bg-red-200 rounded-md px-4 h-8 text-red-700 flex items-center">
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
            <div className="grid sm:col-span-4 gap-3  ">
                <div className="flex justify-center gap-3 items-center">
                        <h1>Status:</h1>
                        {renderStatusTag()}
                </div>
                <div className="flex justify-center gap-3 flex-wrap">
                    <button className="px-2 md:px-4 md:py-1  text-green-500 border border-green-500 rounded-md flex items-center gap-2 
                        active:scale-75 active:bg-green-500 active:text-white ">
                        Mark as Completed <DynamicIcon name="IoCheckmarkDoneOutline"/>
                    </button>
                    <button className="px-2 md:px-4 md:py-1  text-blue-500 border border-blue-500 rounded-md flex items-center gap-2 
                        active:scale-75 active:bg-blue-500 active:text-white ">
                        Reschedule<DynamicIcon name="FaRegClock"/>
                    </button>
                     <button className="px-2 md:px-4 md:py-1 border   text-red-500 rounded-md flex items-center gap-2 active:scale-75
                     active:bg-red-500 active:text-white">
                        Cancel <DynamicIcon name="MdClose"/>
                    </button>
                </div>
                <div className="flex items-start justify-end">
                    <button className="text-blue-500 flex items-center gap-2"> View details <DynamicIcon name="FaArrowRight"/></button>
                </div>
            </div>


        </div>
    )
}