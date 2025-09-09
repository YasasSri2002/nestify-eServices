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
import BookingProvidersCard  from "@/components/ui/bookingProvidersCard";




export default function AllProviders() { 

  const images =[
  "https://avatar.iran.liara.run/public/girl",
  "https://avatar.iran.liara.run/public/boy",
  "https://avatar.iran.liara.run/public/boy?username=Scott",
  "https://avatar.iran.liara.run/public/boy?username=Maria",
  "https://avatar.iran.liara.run/username?username=nayanja+nipunsara",
  "https://avatar.iran.liara.run/username?username=[firstname+lastname]",
  "https://avatar.iran.liara.run/username?username=[firstname+lastname]",
  "https://avatar.iran.liara.run/username?username=[firstname+lastname]"
  ]

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
      <div className="grid justify-items-center sm:justify-items-normal">
        <div className="sm:grid sm:grid-cols-4">
        <div className="sm:col-1 bg-gradient-to-t from-white from-10% via-gray-100 via-30% to-gray-200 to-90% w-dvw sm:w-full h-[10em] sm:h-full rounded-b-2xl ">
          <div className="sm:mx-6 my-2 pt-5">
            <h1>Search service providers</h1>
          </div>
          <div className="flex justify-center sm:justify-normal items-center space-x-2">
            <DynamicIcon name="CiSearch" className="relative left-10" />
            <input
              type="text"
              placeholder="search"
              className="bg-white rounded-2xl px-10 w-40 sm:w-fit"
            />
          </div>
        </div>
        <div className="sm:col-span-3 bg-white w-dvw sm:w-full  p-10">
          <div className="grid justify-items-center w-full gap-5">
            {
              entries.map((provider, index)=>(
                //  <h1 key={provider.email}>{provider.email}</h1>
                <BookingProvidersCard key={provider.email} 
                providers={provider}
                images={images[index % images.length]}
                />
              ))}
              {/* <BookingProvidersCard/> */}
              
          </div>
        </div>

        {/* Moved pagination to inside content area */}
        <div className="col-span-4 justify-items-center">
          <PaginationControls
            hasNextPage={end < providers.length}
            hasPrevPage={start > 0}
            endPage={providers.length}
          />
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}