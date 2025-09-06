'use client'
import Footer from "@/components/ui/footer";
import NavBar from "@/components/ui/navbar";
import DynamicIcon from "@/components/utill/DynamicIcons";
import PaginationControls from "@/components/utill/paginationControls";
import { useSearchParams } from "next/navigation"; // Add this import
import axios from "axios";
import { useEffect,useState } from "react";
import ProviderCard from "@/components/ui/providerCard";
import { ProviderDto } from "@/dto/ProviderDto";



export default function AllProviders() { 
  const [providers, setProviders] = useState<ProviderDto[]>([])
  useEffect(()=>{
    

    const getProviders = async()=>{
    const response = await axios.get<ProviderDto[]>(
      "http://localhost:8080/api/v1/providers/all"
    )
    setProviders(response.data);
    console.log(response.data)
  }

  getProviders();
    
  },[])

  const searchParams = useSearchParams(); // Using client-side hook
    const page = searchParams.get('page') ?? '1';
    const per_page = searchParams.get('per_page') ?? '5';
  
    const start = (Number(page) - 1) * Number(per_page);
    const end = start + Number(per_page);
    const entries = providers.slice(start, end);
  
  return (
    <>
      <NavBar />
      <div className="grid grid-cols-4">
        <div className="col-1 bg-sky-300 w-full h-dvh">
          <div>
            <h1>Search service providers</h1>
          </div>
          <div className="flex items-center space-x-2">
            <DynamicIcon name="CiSearch" className="relative left-10" />
            <input
              type="text"
              placeholder="search"
              className="bg-white rounded-2xl px-10"
            />
          </div>
        </div>
        <div className="col-span-3 bg-red-200 w-full h-dvh">
          <div>
            {
              entries.map((provider)=>(
                 <h1 key={provider.email}>{provider.email}</h1>
              ))}
          </div>
        </div>

        {/* Moved pagination to inside content area */}
        <div className="col-span-4 justify-items-center">
          <PaginationControls
            hasNextPage={end < providers.length}
            hasPrevPage={start > 0}
            endPage={end}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}