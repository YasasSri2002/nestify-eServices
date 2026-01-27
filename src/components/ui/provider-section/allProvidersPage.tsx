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
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);



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
        <div>
        <div className="bg-gray-600 flex items-center justify-between p-5 gap-4">
        {/* Search */}
          <div className="flex items-center space-x-2 w-full md:w-auto border border-red-500">
            <DynamicIcon name="CiSearch" className="relative left-10 text-gray-900" />
            <input
              type="text"
              className="bg-white rounded-lg px-10 py-2 w-full md:w-64 lg:w-150"
            />
          </div>

          {/* Desktop filters */}
          <div className="gap-5 hidden md:flex">
            <button  className="px-5 py-2 rounded-xl border text-white hover:bg-white hover:text-black transition">
              Service Category
            </button>
            <button  className="px-5 py-2 rounded-xl border text-white hover:bg-white hover:text-black transition">
              Job Count
            </button>
            <button  className="px-5 py-2 rounded-xl border text-white hover:bg-white hover:text-black transition">
              Experience
            </button>
          </div>

          {/* Mobile filter button */}
          <div className="md:hidden flex justify-end">
            <button onClick={() => setMobileFilterOpen(!mobileFilterOpen)}>
              <DynamicIcon name="HiOutlineAdjustmentsHorizontal" className="text-2xl text-white" />
            </button>
          </div>

          {/* Mobile filters */}
          {mobileFilterOpen && (
            <div className="grid gap-3 md:hidden">
              <button  className="filter-btn">Service Category</button>
              <button  className="filter-btn">Job Count</button>
              <button className="filter-btn">Experience</button>
            </div>
          )}
      </div>
        
        <div className="bg-white w-dvw sm:w-full  p-10">
          <div className="grid justify-items-center md:flex md:justify-between md:flex-wrap w-full gap-5">
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