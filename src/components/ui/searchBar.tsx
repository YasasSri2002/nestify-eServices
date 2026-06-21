"use client";

import { useEffect,useState } from 'react';

import { getAllCategories } from '@/app/api-calls/category/all/route';
import { CategoryResponseDto } from '@/dto/CategoryDto';
import { Search} from 'lucide-react';



export default function Searchbar() {

  const[category,setCategory] = useState<CategoryResponseDto[]>([]);
  const[isLoading,setIsLoading] =useState(true);

  useEffect(()=>{
       async function fetchCategories(){
                  const data = await getAllCategories();
                  setCategory(data);
                  setIsLoading(false);
              }
              fetchCategories()
  },[])

  return (
    <div className='flex flex-col xl:flex-row justify-center items-center gap-4 sm:gap-5 my-5'>
      <div className='w-full relative flex justify-center items-center '>
        <Search 
          className="absolute left-10 sm:left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] w-5 h-5" 
        />
        <input 
          placeholder="What service do you need?"
          className=' w-25em sm:w-full focus:text-center h-10 sm:h-12 rounded-2xl px-10 bg-[#F4F7F7] border border-[#E2E8F0] focus:border-[#1D4ED8] focus:outline-none transition-colors duration-200'
        />
      </div>
      
      <div className='w-full flex justify-center gap-4 '>
        <select name="categories" className='h-10 sm:h-12 w-1/2 pl-3 bg-[#F4F7F7] border border-[#E2E8F0] rounded-xl text-[#475569] focus:border-[#1D4ED8] focus:outline-none transition-colors duration-200
        '>
          <option value="">All Categories</option>
          {
            isLoading? <option>loading..</option> :
            category.map(category=>(
              <option value={category.name} key={category.id} className='capitalize' >{category.name}</option>
            ))
          }
        </select>
        
        <button className="flex items-center justify-center p-2 sm:p-4 text-white text-base sm:text-lg bg-[#1D4ED8] hover:bg-[#2563EB] rounded-2xl h-10 sm:h-12 w-25em sm:w-auto min-w-[120px] active:scale-95 transition-all duration-200">
          <Search size={20} stroke='white' className="mr-1 sm:mr-2" /> 
          Search
        </button>
      </div>
    </div>
  );
}