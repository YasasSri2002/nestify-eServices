import DynamicIcon from "@/components/utill/DynamicIcons";

export default function HowWeWork(){
    return(
    
        <div className="h-full">
            <div className="p-10 grid justify-items-center gap-5">
                <h1 className="text-2xl">How We Work</h1>
                <p className="text-xl text-gray-800/80 text-center">Getting the help you need for your home has never been easier. Follow these simple steps to connect with trusted professionals</p>
            </div>
            <div className="sm:flex flex-wrap w-full gap-4">
                <div className="flex-1  bg-white m-2 rounded-3xl shadow-xl py-2 mx-10 sm:mx-0">
                    <div className="grid justify-items-center">
                    <div className="rounded-full w-[75px] h-[75px] bg-white/80 flex justify-center items-center mb-5 shadow-2xl hover:border-1 hover:border-black/80">
                        <DynamicIcon name="CiSearch" className="text-4xl" />
                    </div>
                    <h1 className="font-bold text-black/80">Search & Discover</h1>
                    <p className="text-gray-800/80 text-center">Browse our network of verified service providers in your area.</p>
                </div>
                </div>
                 <div className="flex-1 bg-white m-2 rounded-3xl shadow-2xl py-2 mx-10 sm:mx-0">
                    <div className="grid justify-items-center">
                    <div className="rounded-full w-[75px] h-[75px] bg-white/80 flex justify-center items-center mb-5 shadow-2xl hover:border-1 hover:border-black/80">
                        <DynamicIcon name="FaUserCheck" className="text-3xl" />
                    </div>
                    <h1 className="font-bold text-black/80">Compare & Choose</h1>
                    <p className="text-gray-800/80 text-center px-2">Review profiles, ratings, and quotes to find the perfect match.</p>
                </div>
                </div>
                 <div className="flex-1 bg-white m-2 rounded-3xl shadow-2xl py-2 mx-10 sm:mx-0">
                    <div className="grid justify-items-center">
                    <div className="rounded-full w-[75px] h-[75px] bg-white/80 flex justify-center items-center mb-5 shadow-2xl hover:border-1 hover:border-black/80">
                        <DynamicIcon name="CiCalendar" className="text-4xl" />
                    </div>
                    <h1 className="font-bold text-black/80">Book & Schedule</h1>
                    <p className="text-gray-800/80 text-center px-4">Schedule your service at a time that works for you.</p>
                </div>
                </div>
                 <div className="flex-1 bg-white m-2 rounded-3xl shadow-2xl py-2 mx-10 sm:mx-0">
                    <div className="grid justify-items-center">
                    <div className="rounded-full w-[75px] h-[75px] bg-white/80 flex justify-center items-center mb-5 shadow-2xl hover:border-1 hover:border-black/80">
                        <DynamicIcon name="IoMdCheckmarkCircleOutline" className="text-4xl" />
                    </div>
                    <h1 className="font-bold text-black/80">Get It Done</h1>
                    <p className="text-gray-800/80 text-center px-5">Enjoy professional service and leave a review when complete.</p>
                </div>
                </div>
                
            </div>
        </div>
        
    )
}