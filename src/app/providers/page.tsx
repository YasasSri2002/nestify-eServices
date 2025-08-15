'use client'
import Footer from "@/components/ui/footer";
import NavBar from "@/components/ui/navbar";
import Searchbar from "@/components/ui/searchBar";
import ServiceProviderNavBar from "@/components/ui/serivceProviderNavBar";
import DynamicIcon from "@/components/utill/DynamicIcons";
import PaginationControls from "@/components/paginationControls";
import { useSearchParams } from "next/navigation"; // Add this import

const data = [
  'entry 1',
  'entry 2',
  'entry 3',
  'entry 4',
  'entry 5',
  'entry 6',
  'entry 7',
  'entry 8',
  'entry 9',
  'entry 10',
]

export default function AllProviders() { // Removed async and searchParams prop
  const searchParams = useSearchParams(); // Using client-side hook
  const page = searchParams.get('page') ?? '1';
  const per_page = searchParams.get('per_page') ?? '5';
  
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);
  const entries = data.slice(start, end);

  return(
    <>
      <NavBar/>
      <div className="grid grid-cols-4">
        <div className="col-1 bg-sky-300 w-full h-dvh">
          <div>
            <h1>Search service providers</h1>
          </div>
          <div className="flex items-center space-x-2">
            <DynamicIcon name="CiSearch" className="relative left-10" />
            <input type="text" placeholder="search" className="bg-white rounded-2xl px-10"/>
          </div>
        </div>
        <div className="col-span-3 bg-red-200 w-full h-dvh">
          {/* Render your entries here */}
          {entries.map((entry) => (
            <div key={entry}>{entry}</div>
          ))}
        </div>
        
        {/* Moved pagination to inside content area */}
        <div className="col-span-4 justify-items-center"> 
          <PaginationControls 
            hasNextPage={end < data.length}
            hasPrevPage={start > 0}
          />
        </div>
      </div>
      <Footer/>
    </>
  );
}