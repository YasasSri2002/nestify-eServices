"use client"
import { Search} from 'lucide-react';

export default function Searchbar() {
  return (
    <div className='flex flex-col xl:flex-row items-center justify-center gap-4 sm:gap-5 my-5 bg-white'>
      <div className='w-full relative flex items-center'>
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
        />
        <input 
          placeholder="What service do you need?"
          className='w-full h-10 sm:h-12 rounded-2xl px-10 bg-[#f1f1f1]'
        />
      </div>
      
      <div className='w-full xl:w-auto flex gap-4'>
        <select name="categories" className='h-10 sm:h-12 w-full pl-3 pr-10 bg-[#f1f1f1] rounded-xl'>
          <option value="">All categories</option>
        </select>
        
        <button className="flex items-center justify-center p-2 sm:p-4 text-white text-base sm:text-lg bg-[hsla(0,0%,7%,1)] rounded-2xl h-10 sm:h-12 w-full sm:w-auto min-w-[120px]">
          <Search size={20} stroke='white' className="mr-1 sm:mr-2" /> 
          Search
        </button>
      </div>
    </div>
  );
}