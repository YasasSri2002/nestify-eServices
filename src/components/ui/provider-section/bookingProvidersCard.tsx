import { ProviderDto } from "@/dto/ProviderDto";

export default function BookingProvidersCard(
    {providers, images}:{ readonly providers: ProviderDto , readonly images:string} 
){
    return(
        
       
            <div className="grid md:flex justify-between bg-white shadow-2xl rounded-2xl w-[18em] md:w-[20em] lg:w-[50em] p-5">
                <div >
                    <img src={images} alt="" className="w-[200px] object-fit max-w-[400px] rounded-2xl" />
                </div>
                <div className=" bg-gray-600 w-[5px] ml-5 mr-1 my-6 rounded-2xl"></div>
                <div className="grid content-between w-full p-5"> 
                        <div className="grid ml-5">
                            <h1 className="first-letter:uppercase">
                                Name: <span className="first-line:uppercase">{providers.userName.charAt(0).toUpperCase()+ providers.userName.slice(1)}
                                    </span></h1>
                            <h1 className="first-letter:uppercase">Experties: <span className="capitalize">{providers.expertise}</span></h1>
                            <h1 className="first-letter:uppercase">experience: <span>{providers.experience}</span></h1>

                        </div>
                        <div className="flex  sm:justify-end justify-normal items-end space-x-5">
                            <button className="bg-sky-600 rounded-2xl hover:scale-105 hover:-translate-y-1 p-2 hover:bg-sky-500 drop-shadow-md drop-shadow-sky-600 hover:drop-shadow-sky-500">More details</button>
                            <button className="bg-sky-600 rounded-2xl hover:scale-105 hover:-translate-y-1 p-2 hover:bg-sky-500 drop-shadow-md drop-shadow-sky-600 hover:drop-shadow-sky-500">Book now</button>
                        </div>
                </div>
            </div>
        
);
}