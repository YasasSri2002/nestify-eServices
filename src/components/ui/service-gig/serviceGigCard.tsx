import Link from 'next/link';

import { ServiceGigResponseDto } from "@/dto/response/ServiceGigResponseDto";
import DynamicIcon from '@/components/utill/DynamicIcons';



export default function ServiceGigCard(
    {serviceGig}:{ readonly serviceGig:ServiceGigResponseDto} 
){
    return(
            <div className="sm:p-5 grid gap-5 border-x border-b rounded-2xl">
                <div>
                    <img src="/cleaning-poster.jpg" alt="" className="w-full h-60 rounded-xl"/>
                </div>
                <div id="card-body" className="grid gap-5">
                    <div id="heading" className="grid gap-2">
                        <h1 className="text-center text-xl">{serviceGig.title}</h1>
                        <p className="text-wrap text-sm">{serviceGig.shortDescription}</p>
                    </div> 
                    <div className="flex justify-between w-full text-sm">
                        <div className="flex space-x-2 justify-center w-full">
                            <h1>{serviceGig.currency}:</h1><h1>{serviceGig.basePrice}</h1><h1>{serviceGig.priceType}</h1>
                        </div>
                    </div>
                    <div className="text-center">
                        <h1>By {serviceGig.provider.userName}</h1>
                    </div>
                    <div className="w-full text-blue-600 flex justify-end ">
                        <Link href={`/service-gigs/details/${serviceGig.id}`} 
                            className='flex space-x-2 justify-end items-center  '>
                                View more 
                                <DynamicIcon name="MdArrowRightAlt" className='text-2xl top-px relative'/>
                        </Link>
                       
                        
                    </div>
                </div>
            </div>
        );
}