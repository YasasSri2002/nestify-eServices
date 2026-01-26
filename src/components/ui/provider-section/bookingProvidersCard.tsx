import Link from "next/link";
import { ProviderDto } from "@/dto/ProviderDto";

export default function BookingProvidersCard(
    {providers}:{ readonly providers: ProviderDto} 
){
    return(
        
       
            <div className="grid bg-white shadow-2xl rounded-2xl w-[15em] sm:w-[18em] h-[20em] p-5">
                <div className="flex justify-center" >
                    <img src={"/user.jpg"} alt="profile logo" 
                    className="w-25 h-25 sm:w-30 sm:h-30 object-fit max-w-100 rounded-full" />
                </div>
                <div className=" bg-gray-600 h-1.25 ml-5 mr-1 my-2 rounded-2xl"></div>
                <div className="grid content-between w-full p-5"> 
                        <div className="grid ml-5">
                            <h1 className="first-line:uppercase text-center">
                                {providers.userName.charAt(0).toUpperCase()+ providers.userName.slice(1)}
                            </h1>
                            <div className="flex justify-between w-full gap-3 sm:gap-0">
                                <h1 className="capitalize">{providers.expertise}</h1>
                                <h1>{providers.experience}</h1>
                            </div>
                        </div>
                        <div className="flex mt-5 justify-center items-end space-x-5">
                            <button className="rounded-md transition-all duration-300  p-2 
                                                active:scale-75 active:bg-gray-300  border">
                                <Link href={`/providers/details/${providers.id}`}>More details</Link>
                            </button>
                            
                        </div>
                </div>
            </div>
        
);
}