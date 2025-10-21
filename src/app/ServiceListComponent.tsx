"use client"
import ServiceCard from "@/components/ui/serviceCard";

export default function ServiceComponent(){
    return(
        
        <div className="my-5">
            
            <h1 className="text-4xl lg:text-5xl text-center text-gray-900">Popular Services</h1>
            <p className="text-lg lg:text-xl text-center text-gray-500">Browse our most requested household services and find the perfect professional for your needs.</p>
            <div className="flex-col justify-items-center sm:justify-center sm:flex sm:flex-row flex-wrap">
          <div className="m-5">
              <ServiceCard name="GiElectric" serviceName="Electrical"/>

          </div>
          <div className="m-5">
               <ServiceCard name="MdOutlineCleaningServices" serviceName="Cleaning"/>
          </div>
          <div className="m-5">
               <ServiceCard name="MdPlumbing" serviceName="Plumbing"/>
          </div>
          <div className="m-5">
                 <ServiceCard name="TbGardenCart" serviceName="Gradening"/>
          </div>
          <div className="m-5">
                 <ServiceCard name="MdOutlineCarpenter" serviceName="Carpenter"/>
          </div>
          
      </div>
        </div>
        
    );
}