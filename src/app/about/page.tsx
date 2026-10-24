import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import AboutHeroSction from "@/components/ui/about-hero-section/aboutHeroSection";
import MissionPage from "./mission";
import JourneySection from "./journey";
import HowWeWork from "./howWeWork";
import ChooseUs from "./choosingUs";

export const metadata: Metadata = {
    title: "About Us | Nestify - Household Service Marketplace",
    description: "Learn about Nestify's mission to connect homeowners with verified, trusted local service providers for repairs, renovations, and home maintenance.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col bg-surface-snow overflow-x-hidden">
            <NavBar />

            <main className="flex-1 w-full overflow-x-hidden">
                {/* Hero Section */}
                <AboutHeroSction />

                {/* Mission Section */}
                <div className="bg-surface-snow border-b border-neutral-200/50">
                    <MissionPage />
                </div>

                {/* Journey Section */}
                <div className="bg-gradient-to-b from-surface-snow via-surface-ice-100 to-surface-ice-200 border-b border-neutral-200/50">
                    <JourneySection />
                </div>

                {/* How We Work Section */}
                <div id="how-we-work" className="bg-surface-snow border-b border-neutral-200/50">
                    <HowWeWork />
                </div>

                {/* Choosing Us Section */}
                <div className="bg-gradient-to-b from-surface-ice-100 to-surface-ice-200">
                    <ChooseUs />
                </div>

                {/* Bottom CTA Banner */}
                <div className="bg-surface-ice-200 py-16 sm:py-20 md:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative overflow-hidden rounded-3xl bg-primary-900 px-6 py-12 sm:px-12 sm:py-16 text-center text-white shadow-2xl">
                            {/* Ambient subtle glow */}
                            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-accent-500/25 rounded-full blur-3xl pointer-events-none" />

                            <div className="relative z-10 max-w-2xl mx-auto">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                                    Ready for a More Reliable Home Experience?
                                </h2>
                                <p className="text-neutral-300 text-sm sm:text-base md:text-lg mb-8 leading-relaxed">
                                    Join thousands of homeowners who book trusted local pros, or become a verified provider to grow your business in your community.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center items-stretch sm:items-center max-w-md mx-auto sm:max-w-none">
                                    <Link
                                        href="/service-gigs"
                                        className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold bg-accent-600 text-white rounded-xl shadow-lg shadow-accent-600/30 hover:bg-accent-500 hover:shadow-accent-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                                    >
                                        Find a Service
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="inline-flex items-center justify-center px-7 py-3.5 text-base font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl backdrop-blur-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                                    >
                                        Join as a Provider
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}