import NavBar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import AboutHeroSction from "@/components/ui/aboutHeroSection";
import MissionPage from "./mission";
import JourneySection from "./journey";

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
        <div>
            <JourneySection/>
        </div>
        <Footer/>
        </>
    );
}