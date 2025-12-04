import { ServiceGigWithProviderDto } from "@/dto/response/ServiceGigsWithProviderDto";
export default function ServiceGigCard(
    {serviceGig}:{ readonly serviceGig:ServiceGigWithProviderDto} 
){
    return(
            <div className="sm:p-5 grid gap-5 border-x-1 border-b-1 rounded-2xl">
                <div>
                    <img src="/cleaning-poster.jpg" alt="" className="w-full h-60 rounded-xl"/>
                </div>
                <div id="card-body">
                    <div id="heading">
                        <h1 className="text-center text-xl">{serviceGig.title}</h1>
                        <p className="text-wrap text-sm">{serviceGig.shortDescription}</p>
                    </div> 
                    <div className="flex justify-between w-full text-sm">
                        <div className="flex space-x-2">
                            <h1>{serviceGig.currency}:</h1><h1>{serviceGig.basePrice}</h1><h1>{serviceGig.priceType}</h1>
                        </div>
                        <div className="flex">
                            <h1>Duration: {serviceGig.durationByHours}</h1><h1>Hr</h1>
                        </div>
                    </div>
                    <div className="text-center">
                        <h1>By {serviceGig.provider.userName}</h1>
                    </div>
                </div>
            </div>
        );
}