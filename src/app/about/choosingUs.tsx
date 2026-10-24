import ChooseCards from "./chooseCards";
import { ChooseCardDetails } from "./chooseCardsDetails";

export default function ChooseUs() {
    const data: ChooseCardDetails[] = [
        {
            id: 1,
            iconName: "FiShield",
            topic: "Verified Providers",
            details: "All service providers are background-checked and identity-verified for your peace of mind."
        },
        {
            id: 2,
            iconName: "IoIosCard",
            topic: "Secure Payments",
            details: "Safe and transparent payment processing with honest pricing and buyer protection."
        },
        {
            id: 3,
            iconName: "FiClock",
            topic: "Quick Booking",
            details: "Book urgent services or schedule ahead effortlessly with real-time confirmation."
        },
        {
            id: 4,
            iconName: "FiMapPin",
            topic: "Local Experts",
            details: "Connect with certified professionals rooted in your neighborhood who understand your area."
        },
        {
            id: 5,
            iconName: "CiStar",
            topic: "5-Star Ratings",
            details: "Read genuine reviews and honest ratings from verified homeowners who booked the service."
        },
        {
            id: 6,
            iconName: "CiHeadphones",
            topic: "24/7 Support",
            details: "Our dedicated customer care team is always on standby to resolve any inquiries promptly."
        }
    ];

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
                <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-accent-600 mb-2">
                    Why Nestify
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 tracking-tight mb-4">
                    Built for Safety, Convenience, and Quality
                </h2>
                <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
                    We designed our platform with high standards so that taking care of your home never feels like a gamble.
                </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {data.map((entity) => (
                    <ChooseCards key={entity.id} details={entity} />
                ))}
            </div>
        </section>
    );
}