import NavBar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import AboutHeroSction from "@/components/ui/aboutHeroSection"

export default function AboutPage(){
    return(
        <>
        <NavBar/>
        <div>
            <AboutHeroSction/>
        </div>
        <Footer/>
        </>
    );
}