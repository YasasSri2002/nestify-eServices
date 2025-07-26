import Image from "next/image";
import HeroSection from "./Hero";
import ServiceCard from "@/components/ui/serviceCard";


export default function Home() {
  return (
    <>
      <HeroSection/>
      <div className="flex-col justify-items-center sm:justify-center sm:flex sm:flex-row flex-wrap">
          <div className="m-5">
              <ServiceCard imageUrl="#" serviceName="electric"/>

          </div>
          <div className="m-5">
               <ServiceCard imageUrl="https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg" serviceName="wada"/>
          </div>
          <div className="m-5">
               <ServiceCard imageUrl="https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg" serviceName="wada"/>
          </div>
          <div className="m-5">
                 <ServiceCard imageUrl="https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg" serviceName="wada"/>
          </div>
          <div className="m-5">
                 <ServiceCard imageUrl="https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg" serviceName="wada"/>
          </div>
          <div className="m-5">
                 <ServiceCard imageUrl="https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg" serviceName="wada"/>
          </div>
      </div>
    </>
  );
}
