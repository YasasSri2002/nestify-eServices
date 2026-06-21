import NavBar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import AboutHeroSction from "@/components/ui/about-hero-section/aboutHeroSection";
import MissionPage from "./mission";
import JourneySection from "./journey";
import HowWeWork from './howWeWork'
import ChooseUs from "./choosingUs";

export default function AboutPage() {
    return (
        <>
            <NavBar />
            <div>
                <AboutHeroSction />
            </div>
            <div className="z-50  py-5 bg-surface-snow">
                <MissionPage />
            </div>

            <div className="bg-gradient-to-b to-surface-ice-200 from-surface-snow via-surface-ice-100">
                <JourneySection />
            </div>

            <div id="how-we-work" className="bg-surface-snow py-5">
                <HowWeWork />
            </div>

            <div className="bg-gradient-to-b to-surface-ice-100 from-surface-ice-200">
                <ChooseUs />
            </div>

            <Footer />
        </>
    );
}