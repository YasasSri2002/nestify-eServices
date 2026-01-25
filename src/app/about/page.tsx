import NavBar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import AboutHeroSction from "@/components/ui/about-hero-section/aboutHeroSection";
import MissionPage from "./mission";
import JourneySection from "./journey";
import HowWeWork from './howWeWork'
import ChooseUs from "./choosingUs";

export default function AboutPage(){
    return(
        <>
        <NavBar/>
        <div>
            <AboutHeroSction/> 
        </div> 
        <div className="z-50">
            <MissionPage/>
        </div>
    
        <JourneySection/>

        <div id="how-we-work">
            <HowWeWork/>
        </div>

        <ChooseUs/>
        <Footer/>
        </>
    );
}