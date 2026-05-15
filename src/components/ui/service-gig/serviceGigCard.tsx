import Link from 'next/link';

import { ServiceGigResponseDto } from "@/dto/response/ServiceGigResponseDto";
import DynamicIcon from '@/components/utill/DynamicIcons';



export default function ServiceGigCard(
    { serviceGig }: { readonly serviceGig: ServiceGigResponseDto }
) {

    function getCategoryTag(value: string) {
        switch (value) {
            case ('cleaning'): {
                return (
                    <span className="bg-green-100 text-green-800 text-sm 
                         px-2.5 py-1 rounded-lg">{value}</span>
                )
            }
            case 'plumbing': {
                return (
                    <span className="bg-blue-100 text-blue-800 text-sm 
                         px-2.5 py-1 rounded-lg">{value}</span>
                )
            }
            case 'electrical': {
                return (
                    <span className="bg-yellow-100 text-yellow-800 text-sm 
                         px-2.5 py-1 rounded-lg">{value}</span>
                )
            }
            case 'gardening': {
                return (
                    <span className="bg-green-100 text-green-800 text-sm 
                         px-2.5 py-1 rounded-lg">{value}</span>
                )
            }
            default:
                return null
        }

    }

    return (
        <div className="mx-5 grid gap-5 shadow-2xl rounded-2xl">
            <div className='relative overflow-hidden rounded-t-xl'>
                <img src="/cleaning-poster.jpg" alt="" className="w-full h-60 object-cover 
                transition-transform duration-300 hover:scale-110" />
                <div className="flex justify-end w-full text-sm relative -top-10 right-3 ">
                    <div className="flex bg-white py-1 px-3 rounded-md gap-0.5">
                        <h1>{serviceGig.currency}:</h1><h1>{serviceGig.basePrice} / </h1>
                        <h1>{serviceGig.priceType}</h1>
                    </div>
                </div>
            </div>
            <div id="card-body" className="grid gap-5 px-2 pb-2">
                <div id="heading" className="grid gap-2">
                    <h1 className="text-lg md:text-xl">{serviceGig.title}</h1>
                    <div className='flex gap-3 items-center'>
                        {
                            getCategoryTag(serviceGig.category.name)
                        }
                        <p className='flex gap-0.5 items-center text-gray-600 text-sm'>
                            <DynamicIcon name='FiMapPin' className='w-4 h-4'/>
                            {serviceGig.serviceLocation}
                        </p>
                    </div>

                    {/* <p className="text-wrap text-sm">
                        {serviceGig.description.length > 100
                            ? serviceGig.description.substring(0, 100) + '...'
                            : serviceGig.description
                        }</p> */}

                    
                </div>
                <div className='flex items-center justify-between'>
                    <div className='flex gap-0.5 items-center text-sm'>
                        <DynamicIcon name='FaStar' className='w-4 h-4 text-amber-400'/>
                        <h1 className='text-sm text-black-95'>4.8 
                                <span className='text-gray-600'>(25)</span>
                        </h1>
                    </div>
                    <div>
                        <h1 className="text-sm">{serviceGig.totalBookingCount} bookings</h1>
                    </div>
                </div>
                <div className="w-full text-blue-600 flex justify-between ">

                    <h1 className="text-sm text-gray-600">
                        {serviceGig.provider.userName}
                    </h1>

                    <Link href={`/service-gigs/details/${serviceGig.id}`}
                        className='flex space-x-2 justify-end items-center text-sm '>
                        View more
                        <DynamicIcon name="MdArrowRightAlt" className='text-lg top-px relative' />
                    </Link>


                </div>
            </div>
        </div>
    );
}