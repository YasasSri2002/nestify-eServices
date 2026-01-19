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
        <div>
        <div className="bg-gray-600  flex items-center justify-between p-5 ">
          <div className="grid">
              
              <div className="flex justify-center sm:justify-normal items-center space-x-2">
                <DynamicIcon name="CiSearch" className="relative left-10" />
                <input
                  type="text"
                  placeholder="search"
                  className="bg-white lg:rounded-lg px-10 w-50 sm:w-fit  xl:h-10"
                />
            </div>
            
          </div>
          <div >
              <div className="md:flex gap-5 hidden ">
                <button className="px-5 py-1 rounded-xl border text-white ">Service Category</button>
                <button className="px-5 py-1 rounded-xl border text-white">Job Count</button>
                <button className="px-5 py-1 rounded-xl border text-white">Exprience</button>
              </div>

              <div className="bg-gray-600 rounded-2xl px-3 py-2 fixed top-0 md:hidden">
                  <div className="grid gap-3">
                    <button className="px-3  py-1 rounded-xl border text-white ">Service Category</button>
                    <button className="px-3 h-8 py-1 rounded-xl border text-white">Job Count</button>
                    <button className="px-3 h-8 py-1 rounded-xl border text-white">Exprience</button>
                  </div>
              </div>


          </div>
        
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