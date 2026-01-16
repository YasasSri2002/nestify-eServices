'use client'
import { useSearchParams } from "next/navigation"; // Add this import
import {useEffect, useState } from "react";

import { ProviderDto } from "@/dto/ProviderDto";
import BookingProvidersCard  from "@/components/ui/provider-section/bookingProvidersCard";
import DynamicIcon from "@/components/utill/DynamicIcons";
import PaginationControls from "@/components/utill/paginationControls";
import { getAllProviders } from "@/app/api-calls/provider/all/route";
import {FullPageLoading} from "@/components/utill/loadingPage";
  
export default function AllProvidersPage(){


  const [providers, setProviders] = useState<ProviderDto[]>([])
  const [loadProviders,setLoadProviders] =useState(true);
  

  useEffect(()=>{
    async function fetchProivders(){
      try{
          const response = await getAllProviders();
          setProviders(response);
          setLoadProviders(false);
          console.log(response)
      }catch(err:any){
          console.log(err)
      }
    }
    fetchProivders();

  },[])

    const searchParams = useSearchParams(); // Using client-side hook
    const page = searchParams.get('page') ?? '1';
    const per_page = searchParams.get('per_page') ?? '5';
  
    const start = (Number(page) - 1) * Number(per_page);
    const end = start + Number(per_page);
    const entries = providers.slice(start, end);

    if(loadProviders) return <FullPageLoading/>


    return(
        <div className="grid justify-items-center sm:justify-items-normal">
        <div className="sm:grid sm:grid-cols-4">
        <div className="sm:col-1 bg-linear-to-t from-white from-10% via-gray-100 via-30% to-gray-200 to-90% w-dvw sm:w-full h-[10em] sm:h-full rounded-b-2xl ">
          <div className="sm:mx-6 my-2 pt-5">
            <h1>Search service providers</h1>
          </div>
          <div className="flex justify-center sm:justify-normal items-center space-x-2">
            <DynamicIcon name="CiSearch" className="relative left-10" />
            <input
              type="text"
              placeholder="search"
              className="bg-white lg:rounded-lg px-10 w-25 sm:w-fit border-2  xl:h-10"
            />
          </div>
          <div className="grid justify-items-end mx-10 my-2">
            <button 
                className='flex justify-center items-center border border-black w-10 lg:w-20 py-2 px-3 rounded-lg
                transition-all delay-50 duration-100 active:scale-85'>
                <DynamicIcon name="CiSearch" className="w-xl h-xl"/>
            </button>
          </div>
          
        </div>
        <div className="sm:col-span-3 bg-white w-dvw sm:w-full  p-10">
          <div className="grid justify-items-center w-full gap-5">
            {
              entries.map((provider, index)=>(
                <BookingProvidersCard key={provider.email} 
                providers={provider}
                />
              ))}
              
          </div>
        </div>

        {/* Moved pagination to inside content area */}
        <div className="grid col-span-4 justify-items-center">
          <PaginationControls
            hasNextPage={end < providers.length}
            hasPrevPage={start > 0}
            endPage={providers.length}
            perPageNumber='5'
            routerPath="providers"
          />
        </div>
      </div>
      </div>
    )
}