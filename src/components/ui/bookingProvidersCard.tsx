import { ProviderDto } from "@/dto/ProviderDto";

export default function BookingProvidersCard({providers}:{providers: ProviderDto}){
    return(
        <>
       
            <div className="grid md:flex justify-between bg-white shadow-2xl rounded-2xl w-[18em] md:w-[20em] lg:w-[50em] p-5">
                <div>
                    <img src="user.jpg" alt="" className="w-full object-fit max-w-[400px] rounded-2xl" />
                </div>
                <div className="grid content-between w-full p-5"> 
                        <div className="grid">
                            <h1>{providers.email}</h1>
                            <h1>{providers.expertise}</h1>
                        </div>
                        <div className="flex  sm:justify-end justify-normal items-end space-x-5">
                            <button className="bg-sky-600 rounded-2xl hover:scale-105 hover:-translate-y-1 p-2 hover:bg-sky-500 drop-shadow-md drop-shadow-sky-600 hover:drop-shadow-sky-500">More details</button>
                            <button className="bg-sky-600 rounded-2xl hover:scale-105 hover:-translate-y-1 p-2 hover:bg-sky-500 drop-shadow-md drop-shadow-sky-600 hover:drop-shadow-sky-500">Book now</button>
                        </div>
                </div>
            </div>
        
        </>
);
}