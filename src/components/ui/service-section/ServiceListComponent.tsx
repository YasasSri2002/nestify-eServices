"use client";

import { useCategories } from "@/hooks/queries/useCategories";
import ServiceCard from "@/components/ui/service-section/serviceCard";
import { LoadingPage } from "@/components/utill/loadingPage";

export default function ServiceComponent() {
  const { data: serviesList = [], isLoading } = useCategories();
  const serviceIconList = ["MdPlumbing", "MdElectricBolt", "GiGardeningShears", "GiVacuumCleaner"];

  if (isLoading) {
    return (
      <>
        <h1 className="text-4xl lg:text-5xl text-center text-gray-900">Popular Services</h1>
        <p className="text-lg lg:text-xl text-center text-gray-500">
          Browse our most requested household services and find the perfect professional for your needs.
        </p>
        <LoadingPage />
      </>
    );
  }

  return (
    <div className="my-5">
      <h1 className="text-4xl lg:text-5xl text-center text-[#0A192F] font-display font-bold">
        Popular Services
      </h1>
      <p className="text-lg lg:text-xl text-center text-[#475569]">
        Browse our most requested household services and find the perfect professional for your needs.
      </p>
      <div className="grid justify-items-center sm:justify-center sm:flex sm:flex-row flex-wrap">
        {serviesList.map((servicesName, index) => (
          <div className="m-5" key={servicesName.id}>
            <ServiceCard
              name={serviceIconList[index % serviceIconList.length]}
              serviceName={servicesName.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}