import DynamicIcon from "@/components/utill/DynamicIcons";

export default function MissionPage() {
    const pillars = [
        {
            icon: "FiAward",
            title: "Verified Craftsmanship",
            description: "Strict background reviews and skill verification ensure only capable, trusted pros enter your home."
        },
        {
            icon: "FiUsers",
            title: "Community Focused",
            description: "Empowering local independent professionals while offering homeowners transparent neighborhood pricing."
        },
        {
            icon: "FiShield",
            title: "Guaranteed Satisfaction",
            description: "Every booking is backed by dedicated support and accountable communication from start to finish."
        }
    ];

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
                {/* Heart / Purpose Icon Badge */}
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-accent-100 text-accent-600 mb-6 shadow-sm ring-8 ring-accent-100/50">
                    <DynamicIcon name="CiHeart" className="text-3xl sm:text-4xl text-accent-600" />
                </div>

                {/* Eyebrow */}
                <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-accent-600 mb-2">
                    Our Mission
                </p>

                {/* Section Title */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 tracking-tight mb-5">
                    Bridging Homes with Dependable Hands
                </h2>

                {/* Mission Statement */}
                <p className="text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed">
                    We believe every homeowner deserves stress-free access to reliable, skilled professionals who respect their living spaces. Nestify eliminates guesswork and hesitation, creating lasting relationships built on quality, transparency, and care.
                </p>
            </div>

            {/* Core Value Pillars Grid */}
            <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {pillars.map((pillar) => (
                    <div
                        key={pillar.title}
                        className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/70 shadow-sm hover:shadow-md transition-shadow duration-200 text-left flex flex-col"
                    >
                        <div className="w-11 h-11 rounded-xl bg-surface-ice-100 text-accent-600 flex items-center justify-center mb-4 shrink-0">
                            <DynamicIcon name={pillar.icon} className="text-xl" />
                        </div>
                        <h3 className="font-semibold text-neutral-800 text-lg mb-2">
                            {pillar.title}
                        </h3>
                        <p className="text-neutral-600 text-sm leading-relaxed">
                            {pillar.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}