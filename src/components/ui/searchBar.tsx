"use client"
import { Search} from 'lucide-react';

export default function Searchbar() {
  return (
    <div className='flex flex-col xl:flex-row justify-center items-center gap-4 sm:gap-5 my-5'>
      <div className='w-full relative flex justify-center items-center'>
        <Search 
          className="absolute left-[18%] sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
        />
        <input 
          placeholder="What service do you need?"
          className=' w-25em sm:w-full h-10 sm:h-12 rounded-2xl px-10 bg-[#f1f1f1]'
        />
      </div>
      
      <div className='w-full flex justify-center gap-4 '>
        <select name="categories" className='h-10 sm:h-12 w-1/2 pl-3 bg-[#f1f1f1] rounded-xl
        '>
          <option value="">All Categories</option>
        </select>
        
        <button className="flex items-center justify-center p-2 sm:p-4 text-white text-base sm:text-lg bg-[hsla(0,0%,7%,1)] rounded-2xl h-10 sm:h-12 w-25em sm:w-auto min-w-[120px]">
          <Search size={20} stroke='white' className="mr-1 sm:mr-2" /> 
          Search
        </button>
      </div>
    </div>
  );
}