import DynamicIcon from "@/components/utill/DynamicIcons";

export default function JourneySection() {
    const milestones = [
        {
            year: "2025",
            tag: "Founded",
            title: "A Clear Idea Takes Root",
            description: "Frustrated by the difficulty of finding dependable local repair and maintenance services, Nestify was created to bring accountability, transparency, and trust to household care."
        },
        {
            year: "2026",
            tag: "Expansion",
            title: "Scaling Verified Standards",
            description: "Surpassed our first major milestone of verified service providers across major cities, establishing strict vetting criteria and customer review safeguards."
        },
        {
            year: "Future",
            tag: "The Vision",
            title: "The Home Service Operating System",
            description: "Empowering neighborhoods with instant booking, guaranteed workmanship, and seamless provider tools to make every home project effortless."
        }
    ];

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
                <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-accent-600 mb-2">
                    Our Growth
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 tracking-tight mb-4">
                    Our Journey So Far
                </h2>
                <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
                    From a humble beginning to a trusted household name, here is how we are building a more dependable way to care for every home.
                </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Timeline Column */}
                <div className="lg:col-span-7">
                    <div className="relative pl-7 sm:pl-9 border-l-2 border-accent-300/70 space-y-10 my-2">
                        {milestones.map((item) => (
                            <div key={item.year} className="relative group">
                                {/* Timeline Node Badge */}
                                <div className="absolute -left-[37px] sm:-left-[45px] top-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent-600 text-white flex items-center justify-center font-bold text-xs sm:text-sm ring-4 ring-white shadow-md group-hover:scale-110 transition-transform duration-200">
                                    {item.year.slice(-2)}
                                </div>

                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-neutral-200/70 shadow-sm hover:shadow-md transition-shadow duration-200">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <span className="text-sm font-bold text-accent-600">{item.year}</span>
                                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent-100 text-accent-600 font-medium">
                                            {item.tag}
                                        </span>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold text-neutral-800 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Imagery & Proof Badge Column */}
                <div className="lg:col-span-5">
                    <div className="relative mx-auto max-w-md lg:max-w-none">
                        <div className="overflow-hidden rounded-3xl shadow-xl border border-white/60 bg-white">
                            <img
                                src="https://images.unsplash.com/photo-1585406666850-82f7532fdae3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5keW1hbiUyMHRvb2xzJTIwc2VydmljZXxlbnwxfHx8fDE3NTc1MTg0Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                                alt="Craftsman and handyman tools in action"
                                className="w-full h-80 sm:h-96 lg:h-[440px] object-cover hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                            />
                        </div>

                        {/* Floating Trust Card Badge */}
                        <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-neutral-200/80 shadow-xl flex items-center gap-4 max-w-[280px] sm:max-w-[320px]">
                            <div className="w-12 h-12 rounded-xl bg-accent-100 text-accent-600 flex items-center justify-center shrink-0">
                                <DynamicIcon name="FiCheckCircle" className="text-2xl text-accent-600" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-neutral-800">100% Vetted Standards</p>
                                <p className="text-xs text-neutral-500">Every pro identity and trade skill verified before approval</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

