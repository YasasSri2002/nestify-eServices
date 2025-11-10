"use client"
import { getAllCategories } from "@/api-calls/category-api";
import ServiceCard from "@/components/ui/service-section/serviceCard";
import { CategoryResponseDto } from "@/dto/CategoryDto";
import { useEffect, useState } from "react";

export default function ServiceComponent(){
    
    const [serviesList,setServiesList] = useState<CategoryResponseDto[]>([]);
    const [serviceIconList,setServiceIconList]= useState(["GiVacuumCleaner","MdPlumbing"]);
    

    useEffect(()=>{
        const serviceData= getAllCategories();

        serviceData.then(data=>{
            setServiesList(data);
        })
    },[])

    return(
        

        <div className="my-5">
            
            <h1 className="text-4xl lg:text-5xl text-center text-gray-900">Popular Services</h1>
            <p className="text-lg lg:text-xl text-center text-gray-500">Browse our most requested household services and find the perfect professional for your needs.</p>
        <div className="grid justify-items-center sm:justify-center sm:flex sm:flex-row flex-wrap">
          {
            serviesList.map((servicesName,index)=>(
                <div className="m-5" key={servicesName.id}>
                    <ServiceCard name={serviceIconList[index % serviceIconList.length]} serviceName={servicesName.name}/>
                </div>  
            ))
          }       
      </div>
        </div>
        
    );
}