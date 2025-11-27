'use client';
import { AddCategory, getAllCategories } from "@/app/api-calls/category/route";
import { CategoryResponseDto } from "@/dto/CategoryDto";
import { FormEvent, useEffect, useState } from "react";

async function addCategoryFormSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    const data = await new FormData(event.currentTarget);
    const name = data.get('name') as string;
    if (!name || name.trim() === '') {
            return console.log("please enter the name");
    }

    try{
         await AddCategory({ name: name.trim() })
       
    }catch(err:any){
        console.log(err)
    }

}

export default function AdminCategorySection(){

    const[categories,setCategories] = useState<CategoryResponseDto[]>([]);

    useEffect(()=>{
        async function fetchCategories(){
            const data = await getAllCategories();
            setCategories(data);
        }
        fetchCategories();
    },[])

    return(
            <>
            <div className="my-5 bg-gradient-to-b bg-gray-100 from-10% from-gray-200 rounded-2xl py-10 lg:px-10">
                <h1 className="text-center text-xl md:text-lg lg:text-2xl">All Categories</h1>
                <table className="table-auto md:table-fixed w-full ">
                    <thead>
                        <tr className="h-15 border-b-2">
                            <th>Id</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        categories.map(category=>(
                            <tr key={category.id} className="h-10">
                                <td className="text-center  text-wrap">{category.id}</td>
                                <td className="text-center ">{category.name}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>

            </div>
            <div className="bg-gray-300 grid gap-5 justify-items-center">
                <h1 className="text-center text-md md:text-lg lg:text-2xl">Add new Category</h1>
                <div className="w-full lg:w-[40em] border-2 border-red-500 p-5">
                    <form onSubmit={addCategoryFormSubmit} className="grid justify-items-center">
                        <div className="flex justify-between w-full space-y-8">
                            <label htmlFor="name">Name:</label>
                            <input type="text" name="name" className="bg-white w-[10em] lg:w-md h-6 lg:h-10 pl-2" />
                        </div>
                        <button type="submit" className="border-2 rounded-2xl bg-green-300 px-2 py-1">Add Category</button>
                    </form>
                </div>
            </div>
            </>
    );
}