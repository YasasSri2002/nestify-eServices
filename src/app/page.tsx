import Image from "next/image";
import HeroSection from "./Hero";
import ServiceComponent from "./ServiceListComponent";
import ProviderCard from "@/components/ui/providerCard";
import ProvidersList from "./ProvidersList";


export default function Home() {
  return (
    <>
      <HeroSection/>
      <ServiceComponent/>
      <ProvidersList/>
    </>
  );
}
