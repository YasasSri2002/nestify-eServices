import HeroSection from "./Hero";
import ServiceComponent from "./ServiceListComponent";
import ProvidersList from "./ProvidersList";
import NavBar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import ProviderPage from "./provider";


export default function Home() {
  return (
    <>
      <NavBar/>
      <HeroSection/>
      <ServiceComponent/>
      <ProvidersList/>
      <Footer/>
      <ProviderPage/>
    </>
  );
}
