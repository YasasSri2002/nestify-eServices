
import HeroSection from "@/components/ui/about-hero-section/Hero";
import ServiceComponent from "../components/ui/service-section/ServiceListComponent";
import ProvidersList from "../components/ui/provider-section/ProvidersList";
import NavBar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";




export default function Home() {
  return (
    <>
      <NavBar/>
      <HeroSection/>
      <ServiceComponent/>
      <ProvidersList/>
      <Footer/>
    </>
  );
}
