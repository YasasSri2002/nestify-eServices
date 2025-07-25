"use client"
import { Search} from 'lucide-react';

export default function Searchbar(){
    return(
        <div className='sm:flex flex-col justify-items-center sm:justify-center my-5'>
            <div className='basis-1/3 mb-5 relative flex items-center'>
                <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2
                 text-gray-400 w-5 h-5" 
                size={24}/>
                <input placeholder="What service do you need?"
                   className='sm:w-2xl w-auto h-10 sm:h-12 rounded-2xl px-10'/>
            </div>
            <div className='my-5'>
                <select name="catogaries" id="">
                <option value="">All catogaries</option>
            </select>
            </div>
            <div>
                 <button className="flex items-center p-2 m-2 text-white sm:text-[1.3em] 
                 bg-[hsla(0,0%,7%,1)] rounded-2xl ">
                <Search size={24} stroke='white' /> search
            </button>
            </div>
           
        </div>

    );
}