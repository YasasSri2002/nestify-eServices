
import HeroSection from "@/components/ui/about-hero-section/Hero";
import ServiceComponent from "../components/ui/service-section/ServiceListComponent";
import PopularProvidersList from "../components/ui/provider-section/popularProvidersList";
import NavBar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import ReviewCard from "@/components/ui/reviews/reviewCard";



export default function Home() {
  return (
    <>
      <NavBar/>
      <HeroSection/>
      <ServiceComponent/>
      <PopularProvidersList/>
      <Footer/>
    </>
  );
}
