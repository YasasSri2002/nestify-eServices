import NavBar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import AboutHeroSction from "@/components/ui/aboutHeroSection";
import MissionPage from "./mission";
import JourneySection from "./journey";
import HowWeWork from './howWeWork'

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

        <HowWeWork/>
        <Footer/>
        </>
    );
}